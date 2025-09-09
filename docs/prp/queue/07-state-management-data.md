# PRP-08: State Management & Data Persistence

## Status: QUEUED
## Created: 2025-01-09
## Priority: Medium
## Target Completion: Week 6
## Dependencies: PRP-06 (Theme/Mode Separation)

## Objective
Establish a robust state management architecture with data persistence capabilities, supporting offline functionality, cross-tab synchronization, and complex application state beyond theme preferences.

## Consolidates
- State Management Patterns (original concept)
- Data Persistence (beyond current theme storage)

## Success Criteria
- [ ] Context providers for global state implemented
- [ ] IndexedDB integration for complex data storage
- [ ] Cross-tab state synchronization
- [ ] Offline data queue with sync strategies
- [ ] State persistence across sessions
- [ ] Migration strategies for data schema changes
- [ ] < 50ms state update performance
- [ ] Type-safe state management

## State Architecture

### Global State Structure
```typescript
interface GlobalState {
  // User preferences
  preferences: {
    theme: {
      style: PunkStyle;
      mode: ThemeMode;
      useSystem: boolean;
    };
    accessibility: {
      reducedMotion: boolean;
      highContrast: boolean;
      fontSize: 'normal' | 'large' | 'extra-large';
    };
    locale: string;
  };
  
  // Application data
  app: {
    isOnline: boolean;
    updateAvailable: boolean;
    syncStatus: 'idle' | 'syncing' | 'error';
    lastSync: Date | null;
  };
  
  // User data
  user: {
    profile: UserProfile | null;
    settings: UserSettings;
    favorites: string[];
  };
  
  // Offline queue
  offline: {
    pendingActions: OfflineAction[];
    lastProcessed: Date | null;
  };
}
```

### Context Providers
```typescript
// Root state provider
export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const persistor = usePersistor(state);
  
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <PersistGate persistor={persistor}>
        {children}
      </PersistGate>
    </StateContext.Provider>
  );
};

// Specialized context providers
export const PreferencesProvider = createSliceProvider('preferences');
export const AppStateProvider = createSliceProvider('app');
export const UserProvider = createSliceProvider('user');
export const OfflineProvider = createSliceProvider('offline');
```

## Data Persistence Layer

### IndexedDB Schema
```typescript
// Database schema definition
const dbSchema = {
  name: 'PunkStackDB',
  version: 1,
  stores: {
    preferences: {
      keyPath: 'id',
      indices: ['userId', 'timestamp']
    },
    userData: {
      keyPath: 'id',
      indices: ['userId', 'type', 'createdAt', 'updatedAt']
    },
    offlineQueue: {
      keyPath: 'id',
      autoIncrement: true,
      indices: ['status', 'priority', 'timestamp']
    },
    cache: {
      keyPath: 'key',
      indices: ['expiresAt', 'category']
    }
  }
};

// Database operations
class PunkStackDB {
  private db: IDBDatabase;
  
  async init() {
    this.db = await openDB('PunkStackDB', 1, {
      upgrade(db) {
        // Create stores and indices
        Object.entries(dbSchema.stores).forEach(([name, config]) => {
          const store = db.createObjectStore(name, {
            keyPath: config.keyPath,
            autoIncrement: config.autoIncrement
          });
          
          config.indices?.forEach(index => {
            store.createIndex(index, index);
          });
        });
      }
    });
  }
  
  async save(store: string, data: any) {
    const tx = this.db.transaction(store, 'readwrite');
    await tx.objectStore(store).put(data);
    await tx.complete;
  }
  
  async load(store: string, key: string) {
    const tx = this.db.transaction(store, 'readonly');
    return await tx.objectStore(store).get(key);
  }
  
  async query(store: string, index: string, query: IDBKeyRange) {
    const tx = this.db.transaction(store, 'readonly');
    const idx = tx.objectStore(store).index(index);
    return await idx.getAll(query);
  }
}
```

### Storage Strategies
```typescript
// Storage adapter pattern
interface StorageAdapter {
  get(key: string): Promise<any>;
  set(key: string, value: any): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
}

// LocalStorage adapter (simple data)
class LocalStorageAdapter implements StorageAdapter {
  async get(key: string) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  
  async set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  async remove(key: string) {
    localStorage.removeItem(key);
  }
  
  async clear() {
    localStorage.clear();
  }
}

// IndexedDB adapter (complex data)
class IndexedDBAdapter implements StorageAdapter {
  constructor(private db: PunkStackDB) {}
  
  async get(key: string) {
    return await this.db.load('cache', key);
  }
  
  async set(key: string, value: any) {
    await this.db.save('cache', { key, value, timestamp: Date.now() });
  }
  
  async remove(key: string) {
    const tx = this.db.db.transaction('cache', 'readwrite');
    await tx.objectStore('cache').delete(key);
  }
  
  async clear() {
    const tx = this.db.db.transaction('cache', 'readwrite');
    await tx.objectStore('cache').clear();
  }
}
```

## Cross-Tab Synchronization

### BroadcastChannel API
```typescript
// Cross-tab state sync
class StateSync {
  private channel: BroadcastChannel;
  private listeners: Map<string, Function[]> = new Map();
  
  constructor() {
    this.channel = new BroadcastChannel('punk-stack-state');
    this.channel.onmessage = this.handleMessage.bind(this);
  }
  
  broadcast(type: string, payload: any) {
    this.channel.postMessage({ type, payload, timestamp: Date.now() });
  }
  
  subscribe(type: string, callback: Function) {
    const listeners = this.listeners.get(type) || [];
    listeners.push(callback);
    this.listeners.set(type, listeners);
  }
  
  private handleMessage(event: MessageEvent) {
    const { type, payload } = event.data;
    const listeners = this.listeners.get(type) || [];
    listeners.forEach(callback => callback(payload));
  }
}

// Usage in state management
const stateSync = new StateSync();

// Broadcast state changes
stateSync.broadcast('theme-change', { style: 'cyberpunk', mode: 'dark' });

// Listen for state changes from other tabs
stateSync.subscribe('theme-change', (theme) => {
  dispatch({ type: 'SET_THEME', payload: theme });
});
```

## Offline Queue Management

### Queue Implementation
```typescript
interface OfflineAction {
  id: string;
  type: string;
  payload: any;
  timestamp: number;
  retries: number;
  priority: 'low' | 'normal' | 'high';
  status: 'pending' | 'processing' | 'failed' | 'completed';
}

class OfflineQueue {
  private db: PunkStackDB;
  private processing = false;
  
  async enqueue(action: Omit<OfflineAction, 'id' | 'timestamp' | 'retries' | 'status'>) {
    const queuedAction: OfflineAction = {
      ...action,
      id: generateId(),
      timestamp: Date.now(),
      retries: 0,
      status: 'pending'
    };
    
    await this.db.save('offlineQueue', queuedAction);
    
    // Try to process immediately if online
    if (navigator.onLine) {
      this.process();
    }
  }
  
  async process() {
    if (this.processing || !navigator.onLine) return;
    
    this.processing = true;
    
    try {
      const pending = await this.db.query(
        'offlineQueue',
        'status',
        IDBKeyRange.only('pending')
      );
      
      // Sort by priority and timestamp
      pending.sort((a, b) => {
        const priorityOrder = { high: 0, normal: 1, low: 2 };
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        return a.timestamp - b.timestamp;
      });
      
      for (const action of pending) {
        await this.processAction(action);
      }
    } finally {
      this.processing = false;
    }
  }
  
  private async processAction(action: OfflineAction) {
    try {
      action.status = 'processing';
      await this.db.save('offlineQueue', action);
      
      // Process based on action type
      await this.executeAction(action);
      
      action.status = 'completed';
      await this.db.save('offlineQueue', action);
    } catch (error) {
      action.retries++;
      action.status = action.retries > 3 ? 'failed' : 'pending';
      await this.db.save('offlineQueue', action);
    }
  }
  
  private async executeAction(action: OfflineAction) {
    // Action execution logic
    switch (action.type) {
      case 'SAVE_USER_DATA':
        await api.saveUserData(action.payload);
        break;
      case 'SYNC_PREFERENCES':
        await api.syncPreferences(action.payload);
        break;
      // ... other action types
    }
  }
}
```

## State Persistence Hooks

### Custom Hooks
```typescript
// Persist state hook
export const usePersistentState = <T>(
  key: string,
  initialValue: T,
  options: {
    storage?: 'local' | 'indexed';
    serialize?: (value: T) => string;
    deserialize?: (value: string) => T;
  } = {}
) => {
  const [state, setState] = useState<T>(initialValue);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Load persisted state
    loadState(key, options).then(persisted => {
      if (persisted !== null) {
        setState(persisted);
      }
      setLoaded(true);
    });
  }, [key]);
  
  useEffect(() => {
    // Persist state changes
    if (loaded) {
      saveState(key, state, options);
    }
  }, [state, loaded, key]);
  
  return [state, setState, loaded] as const;
};

// Offline-aware hook
export const useOfflineState = <T>(
  key: string,
  fetchFn: () => Promise<T>,
  options: {
    cacheTime?: number;
    syncOnReconnect?: boolean;
  } = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      
      // Try to fetch fresh data
      if (navigator.onLine) {
        const fresh = await fetchFn();
        setData(fresh);
        await cacheData(key, fresh, options.cacheTime);
      } else {
        // Load from cache when offline
        const cached = await loadCachedData(key);
        if (cached) {
          setData(cached);
        } else {
          throw new Error('No cached data available');
        }
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [key, fetchFn]);
  
  useEffect(() => {
    fetch();
  }, [fetch]);
  
  // Re-sync on reconnect
  useEffect(() => {
    if (options.syncOnReconnect) {
      const handleOnline = () => fetch();
      window.addEventListener('online', handleOnline);
      return () => window.removeEventListener('online', handleOnline);
    }
  }, [fetch, options.syncOnReconnect]);
  
  return { data, loading, error, refetch: fetch };
};
```

## Migration Strategies

### Schema Migrations
```typescript
// Migration system for IndexedDB
class MigrationManager {
  private migrations: Map<number, Migration> = new Map();
  
  register(version: number, migration: Migration) {
    this.migrations.set(version, migration);
  }
  
  async migrate(fromVersion: number, toVersion: number) {
    for (let v = fromVersion + 1; v <= toVersion; v++) {
      const migration = this.migrations.get(v);
      if (migration) {
        await migration.up();
      }
    }
  }
}

// Example migration
const migration_v2: Migration = {
  up: async (db: IDBDatabase) => {
    // Add new store
    const store = db.createObjectStore('newFeature', { keyPath: 'id' });
    store.createIndex('userId', 'userId');
    
    // Migrate existing data
    const tx = db.transaction(['userData'], 'readwrite');
    const cursor = await tx.objectStore('userData').openCursor();
    
    while (cursor) {
      const record = cursor.value;
      // Transform data
      record.newField = defaultValue;
      await cursor.update(record);
      await cursor.continue();
    }
  },
  
  down: async (db: IDBDatabase) => {
    db.deleteObjectStore('newFeature');
  }
};
```

## Performance Optimizations

### State Update Batching
```typescript
// Batch multiple state updates
class BatchedUpdates {
  private pending: Map<string, any> = new Map();
  private scheduled = false;
  
  update(key: string, value: any) {
    this.pending.set(key, value);
    
    if (!this.scheduled) {
      this.scheduled = true;
      requestAnimationFrame(() => this.flush());
    }
  }
  
  private flush() {
    const updates = new Map(this.pending);
    this.pending.clear();
    this.scheduled = false;
    
    // Apply all updates at once
    dispatch({
      type: 'BATCH_UPDATE',
      payload: Object.fromEntries(updates)
    });
  }
}
```

## Deliverables
1. Complete state management implementation
2. IndexedDB integration with migrations
3. Cross-tab synchronization system
4. Offline queue with retry logic
5. Performance benchmarks and optimization report
6. State management documentation
7. Migration guide for data schema changes

## References
- IndexedDB API: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
- BroadcastChannel API: https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel
- React Context Best Practices: https://react.dev/learn/passing-data-deeply-with-context
- Offline First: https://offlinefirst.org/