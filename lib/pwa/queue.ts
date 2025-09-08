import { 
  addToQueue, 
  getQueuedActions, 
  updateQueuedAction, 
  removeFromQueue,
  QueuedAction 
} from '@/lib/db';

// Queue processor for syncing actions when online
export class OfflineQueue {
  private isProcessing = false;
  private maxRetries = 3;
  private retryDelay = 1000; // Start with 1 second

  // Add action to queue
  async enqueue(type: QueuedAction['type'], payload: Record<string, unknown>) {
    return await addToQueue({ type, payload });
  }

  // Process all pending actions
  async processQueue() {
    if (this.isProcessing) return;
    
    this.isProcessing = true;
    
    try {
      const pendingActions = await getQueuedActions('pending');
      
      for (const action of pendingActions) {
        await this.processAction(action);
      }
    } finally {
      this.isProcessing = false;
    }
  }

  // Process individual action
  private async processAction(action: QueuedAction) {
    try {
      // Mark as processing
      await updateQueuedAction(action.id, { status: 'processing' });
      
      // Process based on action type
      const success = await this.executeAction(action);
      
      if (success) {
        // Remove from queue on success
        await removeFromQueue(action.id);
      } else {
        // Handle failure
        await this.handleFailure(action);
      }
    } catch (error) {
      console.error('Error processing queued action:', error);
      await this.handleFailure(action);
    }
  }

  // Execute the actual action
  private async executeAction(action: QueuedAction): Promise<boolean> {
    switch (action.type) {
      case 'theme-change':
        return await this.syncThemeChange(action.payload);
      
      case 'setting-update':
        return await this.syncSettingUpdate(action.payload);
      
      case 'custom':
        return await this.syncCustomAction(action.payload);
      
      default:
        console.warn('Unknown action type:', action.type);
        return true; // Remove unknown actions
    }
  }

  // Sync theme change
  private async syncThemeChange(payload: Record<string, unknown>): Promise<boolean> {
    try {
      // In a real app, this would sync with a backend
      // For now, just store locally
      console.log('Syncing theme change:', payload);
      return true;
    } catch (error) {
      console.error('Failed to sync theme:', error);
      return false;
    }
  }

  // Sync setting update
  private async syncSettingUpdate(payload: Record<string, unknown>): Promise<boolean> {
    try {
      // In a real app, this would sync with a backend
      console.log('Syncing setting update:', payload);
      return true;
    } catch (error) {
      console.error('Failed to sync setting:', error);
      return false;
    }
  }

  // Sync custom action
  private async syncCustomAction(payload: Record<string, unknown>): Promise<boolean> {
    try {
      // Handle custom actions
      if (payload.endpoint && payload.method) {
        const response = await fetch(payload.endpoint as string, {
          method: payload.method as string,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload.data),
        });
        
        return response.ok;
      }
      return true;
    } catch (error) {
      console.error('Failed to sync custom action:', error);
      return false;
    }
  }

  // Handle failed action
  private async handleFailure(action: QueuedAction) {
    const retries = action.retries + 1;
    
    if (retries >= this.maxRetries) {
      // Max retries reached, mark as failed
      await updateQueuedAction(action.id, { 
        status: 'failed',
        retries,
      });
    } else {
      // Schedule retry with exponential backoff
      const delay = this.retryDelay * Math.pow(2, retries);
      
      setTimeout(async () => {
        await updateQueuedAction(action.id, { 
          status: 'pending',
          retries,
        });
        // Process again
        this.processQueue();
      }, delay);
    }
  }

  // Clear all failed actions
  async clearFailed() {
    const failedActions = await getQueuedActions('failed');
    for (const action of failedActions) {
      await removeFromQueue(action.id);
    }
  }

  // Retry all failed actions
  async retryFailed() {
    const failedActions = await getQueuedActions('failed');
    for (const action of failedActions) {
      await updateQueuedAction(action.id, { 
        status: 'pending',
        retries: 0,
      });
    }
    await this.processQueue();
  }
}

// Singleton instance
let queueInstance: OfflineQueue | null = null;

export function getOfflineQueue(): OfflineQueue {
  if (!queueInstance) {
    queueInstance = new OfflineQueue();
  }
  return queueInstance;
}

// Auto-sync when coming back online
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    console.log('Back online, processing offline queue...');
    const queue = getOfflineQueue();
    queue.processQueue();
  });
}