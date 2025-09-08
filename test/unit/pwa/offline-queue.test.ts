import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { OfflineQueue, getOfflineQueue } from '@/lib/pwa/queue';
import * as db from '@/lib/db';

// Mock the database module
vi.mock('@/lib/db', () => ({
  addToQueue: vi.fn(),
  getQueuedActions: vi.fn(),
  updateQueuedAction: vi.fn(),
  removeFromQueue: vi.fn(),
}));

// Mock fetch for custom action tests
global.fetch = vi.fn();

describe('OfflineQueue', () => {
  let queue: OfflineQueue;

  beforeEach(() => {
    queue = new OfflineQueue();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('enqueue', () => {
    it('should add action to queue', async () => {
      const mockAction = {
        id: 'test-123',
        type: 'theme-change' as const,
        payload: { theme: 'neon-noir' },
        timestamp: Date.now(),
        retries: 0,
        status: 'pending' as const,
      };

      vi.mocked(db.addToQueue).mockResolvedValue(mockAction);

      const result = await queue.enqueue('theme-change', { theme: 'neon-noir' });

      expect(db.addToQueue).toHaveBeenCalledWith({
        type: 'theme-change',
        payload: { theme: 'neon-noir' },
      });
      expect(result).toEqual(mockAction);
    });
  });

  describe('processQueue', () => {
    it('should process all pending actions', async () => {
      const mockActions = [
        {
          id: 'action-1',
          type: 'theme-change' as const,
          payload: { theme: 'neon-noir' },
          timestamp: Date.now(),
          retries: 0,
          status: 'pending' as const,
        },
        {
          id: 'action-2',
          type: 'setting-update' as const,
          payload: { key: 'notifications', value: true },
          timestamp: Date.now(),
          retries: 0,
          status: 'pending' as const,
        },
      ];

      vi.mocked(db.getQueuedActions).mockResolvedValue(mockActions);
      vi.mocked(db.updateQueuedAction).mockResolvedValue(undefined);
      vi.mocked(db.removeFromQueue).mockResolvedValue(undefined);

      await queue.processQueue();

      expect(db.getQueuedActions).toHaveBeenCalledWith('pending');
      expect(db.updateQueuedAction).toHaveBeenCalledTimes(2);
      expect(db.removeFromQueue).toHaveBeenCalledTimes(2);
    });

    it('should not process if already processing', async () => {
      vi.mocked(db.getQueuedActions).mockResolvedValue([]);

      // Start processing
      const promise1 = queue.processQueue();
      const promise2 = queue.processQueue();

      await Promise.all([promise1, promise2]);

      // Should only be called once
      expect(db.getQueuedActions).toHaveBeenCalledTimes(1);
    });
  });

  describe('action execution', () => {
    it('should handle theme change actions', async () => {
      const mockAction = {
        id: 'theme-1',
        type: 'theme-change' as const,
        payload: { theme: 'neon-noir', mode: 'dark' },
        timestamp: Date.now(),
        retries: 0,
        status: 'pending' as const,
      };

      vi.mocked(db.getQueuedActions).mockResolvedValue([mockAction]);
      vi.mocked(db.updateQueuedAction).mockResolvedValue(undefined);
      vi.mocked(db.removeFromQueue).mockResolvedValue(undefined);

      await queue.processQueue();

      expect(db.removeFromQueue).toHaveBeenCalledWith('theme-1');
    });

    it('should handle custom API actions', async () => {
      const mockAction = {
        id: 'custom-1',
        type: 'custom' as const,
        payload: {
          endpoint: '/api/sync',
          method: 'POST',
          data: { test: 'data' },
        },
        timestamp: Date.now(),
        retries: 0,
        status: 'pending' as const,
      };

      vi.mocked(db.getQueuedActions).mockResolvedValue([mockAction]);
      vi.mocked(db.updateQueuedAction).mockResolvedValue(undefined);
      vi.mocked(db.removeFromQueue).mockResolvedValue(undefined);
      vi.mocked(fetch).mockResolvedValue(
        new Response(null, { status: 200, statusText: 'OK' })
      );

      await queue.processQueue();

      expect(fetch).toHaveBeenCalledWith('/api/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ test: 'data' }),
      });
      expect(db.removeFromQueue).toHaveBeenCalledWith('custom-1');
    });
  });

  describe('failure handling', () => {
    it('should retry failed actions with exponential backoff', async () => {
      vi.useFakeTimers();
      
      const mockAction = {
        id: 'fail-1',
        type: 'custom' as const,
        payload: {
          endpoint: '/api/sync',
          method: 'POST',
          data: { test: 'data' },
        },
        timestamp: Date.now(),
        retries: 0,
        status: 'pending' as const,
      };

      vi.mocked(db.getQueuedActions).mockResolvedValue([mockAction]);
      vi.mocked(db.updateQueuedAction).mockResolvedValue(undefined);
      vi.mocked(fetch).mockRejectedValue(new Error('Network error'));

      await queue.processQueue();

      // Should schedule retry
      expect(db.updateQueuedAction).toHaveBeenCalledWith('fail-1', {
        status: 'processing',
      });

      // Fast-forward to retry
      vi.advanceTimersByTime(2000); // 1000ms * 2^1

      vi.useRealTimers();
    });

    it('should mark as failed after max retries', async () => {
      const mockAction = {
        id: 'fail-max',
        type: 'custom' as const,
        payload: {
          endpoint: '/api/sync',
          method: 'POST',
          data: { test: 'data' },
        },
        timestamp: Date.now(),
        retries: 2, // Already retried twice
        status: 'pending' as const,
      };

      vi.mocked(db.getQueuedActions).mockResolvedValue([mockAction]);
      vi.mocked(db.updateQueuedAction).mockResolvedValue(undefined);
      vi.mocked(fetch).mockRejectedValue(new Error('Network error'));

      await queue.processQueue();

      // Should mark as failed
      expect(db.updateQueuedAction).toHaveBeenCalledWith('fail-max', {
        status: 'failed',
        retries: 3,
      });
    });
  });

  describe('utility methods', () => {
    it('should clear failed actions', async () => {
      const failedActions = [
        {
          id: 'failed-1',
          type: 'theme-change' as const,
          payload: {},
          timestamp: Date.now(),
          retries: 3,
          status: 'failed' as const,
        },
        {
          id: 'failed-2',
          type: 'setting-update' as const,
          payload: {},
          timestamp: Date.now(),
          retries: 3,
          status: 'failed' as const,
        },
      ];

      vi.mocked(db.getQueuedActions).mockResolvedValue(failedActions);
      vi.mocked(db.removeFromQueue).mockResolvedValue(undefined);

      await queue.clearFailed();

      expect(db.getQueuedActions).toHaveBeenCalledWith('failed');
      expect(db.removeFromQueue).toHaveBeenCalledWith('failed-1');
      expect(db.removeFromQueue).toHaveBeenCalledWith('failed-2');
    });

    it('should retry all failed actions', async () => {
      const failedActions = [
        {
          id: 'retry-1',
          type: 'theme-change' as const,
          payload: {},
          timestamp: Date.now(),
          retries: 3,
          status: 'failed' as const,
        },
      ];

      vi.mocked(db.getQueuedActions)
        .mockResolvedValueOnce(failedActions) // For retryFailed
        .mockResolvedValueOnce([]); // For processQueue
      vi.mocked(db.updateQueuedAction).mockResolvedValue(undefined);

      await queue.retryFailed();

      expect(db.updateQueuedAction).toHaveBeenCalledWith('retry-1', {
        status: 'pending',
        retries: 0,
      });
    });
  });

  describe('singleton instance', () => {
    it('should return same instance', () => {
      const instance1 = getOfflineQueue();
      const instance2 = getOfflineQueue();
      
      expect(instance1).toBe(instance2);
    });
  });
});