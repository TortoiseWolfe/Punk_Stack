import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  initDB,
  saveTheme,
  getTheme,
  addToQueue,
  getQueuedActions,
  updateQueuedAction,
  removeFromQueue,
  clearQueue,
  saveSetting,
  getSetting,
  clearAllData,
  isIndexedDBAvailable,
} from '@/lib/db';

// Mock IDB for testing
vi.mock('idb', () => ({
  openDB: vi.fn(() => {
    const stores = new Map();
    
    return Promise.resolve({
      put: vi.fn((storeName: string, value: { id?: string; key?: string; [key: string]: unknown }) => {
        if (!stores.has(storeName)) {
          stores.set(storeName, new Map());
        }
        stores.get(storeName).set(value.id || value.key, value);
        return Promise.resolve();
      }),
      get: vi.fn((storeName: string, key: string) => {
        const store = stores.get(storeName);
        return Promise.resolve(store ? store.get(key) : undefined);
      }),
      add: vi.fn((storeName: string, value: { id: string; [key: string]: unknown }) => {
        if (!stores.has(storeName)) {
          stores.set(storeName, new Map());
        }
        stores.get(storeName).set(value.id, value);
        return Promise.resolve();
      }),
      delete: vi.fn((storeName: string, key: string) => {
        const store = stores.get(storeName);
        if (store) store.delete(key);
        return Promise.resolve();
      }),
      clear: vi.fn((storeName: string) => {
        stores.set(storeName, new Map());
        return Promise.resolve();
      }),
      getAll: vi.fn((storeName: string) => {
        const store = stores.get(storeName);
        return Promise.resolve(store ? Array.from(store.values()) : []);
      }),
      getAllFromIndex: vi.fn((storeName: string, indexName: string, value: unknown) => {
        const store = stores.get(storeName);
        if (!store) return Promise.resolve([]);
        return Promise.resolve(
          Array.from(store.values()).filter((item: Record<string, unknown>) => item[indexName] === value)
        );
      }),
      transaction: vi.fn(() => ({
        objectStore: vi.fn((storeName: string) => ({
          clear: vi.fn(() => {
            stores.set(storeName, new Map());
            return Promise.resolve();
          }),
        })),
        done: Promise.resolve(),
      })),
    });
  }),
}));

describe('IndexedDB Integration', () => {
  beforeEach(async () => {
    await initDB();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Theme Storage', () => {
    it('should save and retrieve theme data', async () => {
      const themeData = {
        theme: 'neon-noir',
        mode: 'dark' as const,
        style: 'cyberpunk',
      };

      await saveTheme(themeData);
      const retrieved = await getTheme();

      expect(retrieved).toBeDefined();
      expect(retrieved?.theme).toBe('neon-noir');
      expect(retrieved?.mode).toBe('dark');
      expect(retrieved?.style).toBe('cyberpunk');
      expect(retrieved?.timestamp).toBeDefined();
    });

    it('should overwrite existing theme', async () => {
      await saveTheme({
        theme: 'neon-noir',
        mode: 'dark',
        style: 'cyberpunk',
      });

      await saveTheme({
        theme: 'solar-bloom',
        mode: 'light',
        style: 'solarpunk',
      });

      const retrieved = await getTheme();
      expect(retrieved?.theme).toBe('solar-bloom');
      expect(retrieved?.mode).toBe('light');
    });
  });

  describe('Queue Operations', () => {
    it('should add actions to queue', async () => {
      const action = await addToQueue({
        type: 'theme-change',
        payload: { theme: 'neon-noir' },
      });

      expect(action.id).toBeDefined();
      expect(action.type).toBe('theme-change');
      expect(action.status).toBe('pending');
      expect(action.retries).toBe(0);
    });

    it('should get queued actions by status', async () => {
      await addToQueue({
        type: 'theme-change',
        payload: { theme: 'neon-noir' },
      });

      await addToQueue({
        type: 'setting-update',
        payload: { key: 'notifications', value: true },
      });

      const pendingActions = await getQueuedActions('pending');
      expect(pendingActions).toHaveLength(2);
    });

    it('should update queued action', async () => {
      const action = await addToQueue({
        type: 'theme-change',
        payload: { theme: 'neon-noir' },
      });

      await updateQueuedAction(action.id, {
        status: 'processing',
        retries: 1,
      });

      const processingActions = await getQueuedActions('processing');
      expect(processingActions).toHaveLength(1);
      expect(processingActions[0].retries).toBe(1);
    });

    it('should remove action from queue', async () => {
      const action = await addToQueue({
        type: 'theme-change',
        payload: { theme: 'neon-noir' },
      });

      await removeFromQueue(action.id);
      const pendingActions = await getQueuedActions('pending');
      expect(pendingActions).toHaveLength(0);
    });

    it('should clear entire queue', async () => {
      await addToQueue({
        type: 'theme-change',
        payload: { theme: 'neon-noir' },
      });

      await addToQueue({
        type: 'setting-update',
        payload: { key: 'notifications', value: true },
      });

      await clearQueue();
      const pendingActions = await getQueuedActions('pending');
      expect(pendingActions).toHaveLength(0);
    });
  });

  describe('Settings Storage', () => {
    it('should save and retrieve settings', async () => {
      await saveSetting('notifications', true);
      await saveSetting('autoSync', false);

      const notifications = await getSetting('notifications');
      const autoSync = await getSetting('autoSync');

      expect(notifications).toBe(true);
      expect(autoSync).toBe(false);
    });

    it('should overwrite existing settings', async () => {
      await saveSetting('notifications', true);
      await saveSetting('notifications', false);

      const value = await getSetting('notifications');
      expect(value).toBe(false);
    });

    it('should return undefined for non-existent settings', async () => {
      const value = await getSetting('nonExistent');
      expect(value).toBeUndefined();
    });
  });

  describe('Utility Functions', () => {
    it('should clear all data', async () => {
      await saveTheme({
        theme: 'neon-noir',
        mode: 'dark',
        style: 'cyberpunk',
      });

      await addToQueue({
        type: 'theme-change',
        payload: { theme: 'neon-noir' },
      });

      await saveSetting('notifications', true);

      await clearAllData();

      const theme = await getTheme();
      const actions = await getQueuedActions();
      const setting = await getSetting('notifications');

      expect(theme).toBeUndefined();
      expect(actions).toHaveLength(0);
      expect(setting).toBeUndefined();
    });

    it('should detect IndexedDB availability', () => {
      const available = isIndexedDBAvailable();
      // In test environment with jsdom, this should return true
      expect(available).toBe(true);
    });
  });
});