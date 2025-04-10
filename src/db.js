// src/db.js
import { openDB } from 'idb';

const DB_NAME = 'mi_tienda';
const DB_VERSION = 1;
const STORE_USUARIOS = 'usuarios';

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_USUARIOS)) {
        db.createObjectStore(STORE_USUARIOS, { keyPath: 'usuario' });
      }
    },
  });
};

export const guardarUsuario = async (usuario) => {
  const db = await initDB();
  await db.put(STORE_USUARIOS, usuario);
};

export const obtenerUsuario = async () => {
  const db = await initDB();
  const tx = db.transaction(STORE_USUARIOS, 'readonly');
  const store = tx.objectStore(STORE_USUARIOS);
  const cursor = await store.openCursor();
  return cursor?.value || null;
};

export const borrarUsuario = async () => {
  const db = await initDB();
  const tx = db.transaction(STORE_USUARIOS, 'readwrite');
  await tx.objectStore(STORE_USUARIOS).clear();
};
