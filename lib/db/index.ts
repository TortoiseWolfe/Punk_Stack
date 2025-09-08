import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'PunkStackDB';
const DB_VERSION = 1;

// Store names
export const STORES = {
  THEME: 'theme',
  QUEUE: 'queue',
  SETTINGS: 'settings',
} as const;

export type StoreNames = typeof STORES[keyof typeof STORES];

// Database schema interfaces
export interface ThemeData {
  id: 'current';
  theme: string;
  mode: 'light' | 'dark';
  style: string;
  timestamp: number;
}

export interface QueuedAction {
  id: string;
  type: 'theme-change' | 'setting-update' | 'custom';
  payload: Record<string, unknown>;
  timestamp: number;
  retries: number;
  status: 'pending' | 'processing' | 'failed';
}

export interface UserSettings {
  id: string;
  key: string;
  value: unknown;
  timestamp: number;
}

// Database instance
let dbPromise: Promise<IDBPDatabase> | null = null;

// Initialize database
export async function initDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Theme store
        if (!db.objectStoreNames.contains(STORES.THEME)) {
          db.createObjectStore(STORES.THEME, { keyPath: 'id' });
        }
        
        // Queue store for offline actions
        if (!db.objectStoreNames.contains(STORES.QUEUE)) {
          const queueStore = db.createObjectStore(STORES.QUEUE, { 
            keyPath: 'id',
            autoIncrement: false 
          });
          queueStore.createIndex('status', 'status');
          queueStore.createIndex('timestamp', 'timestamp');
        }
        
        // Settings store
        if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
          const settingsStore = db.createObjectStore(STORES.SETTINGS, { 
            keyPath: 'id' 
          });
          settingsStore.createIndex('key', 'key', { unique: true });
        }
      },
    });
  }
  return dbPromise;
}

// Theme operations
export async function saveTheme(theme: Omit<ThemeData, 'id' | 'timestamp'>) {
  const db = await initDB();
  return db.put(STORES.THEME, {
    id: 'current',
    ...theme,
    timestamp: Date.now(),
  });
}

export async function getTheme(): Promise<ThemeData | undefined> {
  const db = await initDB();
  return db.get(STORES.THEME, 'current');
}

// Queue operations for offline sync
export async function addToQueue(action: Omit<QueuedAction, 'id' | 'timestamp' | 'retries' | 'status'>) {
  const db = await initDB();
  const id = `${action.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const queuedAction: QueuedAction = {
    id,
    ...action,
    timestamp: Date.now(),
    retries: 0,
    status: 'pending',
  };
  
  await db.add(STORES.QUEUE, queuedAction);
  return queuedAction;
}

export async function getQueuedActions(status: QueuedAction['status'] = 'pending'): Promise<QueuedAction[]> {
  const db = await initDB();
  return db.getAllFromIndex(STORES.QUEUE, 'status', status);
}

export async function updateQueuedAction(id: string, updates: Partial<QueuedAction>) {
  const db = await initDB();
  const action = await db.get(STORES.QUEUE, id);
  if (action) {
    await db.put(STORES.QUEUE, { ...action, ...updates });
  }
}

export async function removeFromQueue(id: string) {
  const db = await initDB();
  return db.delete(STORES.QUEUE, id);
}

export async function clearQueue() {
  const db = await initDB();
  return db.clear(STORES.QUEUE);
}

// Settings operations
export async function saveSetting(key: string, value: unknown) {
  const db = await initDB();
  const setting: UserSettings = {
    id: key,
    key,
    value,
    timestamp: Date.now(),
  };
  return db.put(STORES.SETTINGS, setting);
}

export async function getSetting(key: string): Promise<unknown> {
  const db = await initDB();
  const setting = await db.get(STORES.SETTINGS, key);
  return setting?.value;
}

export async function getAllSettings(): Promise<UserSettings[]> {
  const db = await initDB();
  return db.getAll(STORES.SETTINGS);
}

// Utility functions
export async function clearAllData() {
  const db = await initDB();
  const tx = db.transaction([STORES.THEME, STORES.QUEUE, STORES.SETTINGS], 'readwrite');
  await Promise.all([
    tx.objectStore(STORES.THEME).clear(),
    tx.objectStore(STORES.QUEUE).clear(),
    tx.objectStore(STORES.SETTINGS).clear(),
    tx.done,
  ]);
}

// Check if IndexedDB is available
export function isIndexedDBAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    return 'indexedDB' in window && window.indexedDB !== null;
  } catch {
    return false;
  }
}