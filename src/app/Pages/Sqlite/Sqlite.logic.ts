import * as SQLite from 'expo-sqlite';
import { useCallback, useState } from 'react';

const DATABASE_NAME = 'app.db';

const CREATE_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    message TEXT NOT NULL
  );
`;

export interface MessageRow {
  id: number;
  message: string;
}

export function useSqliteLogic() {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [messageInput, setMessageInput] = useState<string>('');
  const [rows, setRows] = useState<MessageRow[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleConnect = useCallback(async () => {
    try {
      const database = await SQLite.openDatabaseAsync(DATABASE_NAME);
      await database.execAsync(CREATE_TABLE_SQL);

      setDb(database);
      setIsConnected(true);
      setStatusMessage('Connected to database. Table ready.');
    } catch (error) {
      setStatusMessage(`Connection failed: ${(error as Error).message}`);
    }
  }, []);

  const handleDisconnect = useCallback(async () => {
    try {
      if (db) {
        await db.closeAsync();
      }
      setDb(null);
      setIsConnected(false);
      setRows([]);
      setStatusMessage('Disconnected from database.');
    } catch (error) {
      setStatusMessage(`Disconnect failed: ${(error as Error).message}`);
    }
  }, [db]);

  const handleInsertMessage = useCallback(async () => {
    if (!db) {
      setStatusMessage('Connect to the database first.');
      return;
    }
    if (!messageInput.trim()) {
      setStatusMessage('Type a message before inserting.');
      return;
    }

    try {
      await db.runAsync('INSERT INTO messages (message) VALUES (?);', [
        messageInput.trim(),
      ]);
      setStatusMessage('Message inserted.');
      setMessageInput('');
    } catch (error) {
      setStatusMessage(`Insert failed: ${(error as Error).message}`);
    }
  }, [db, messageInput]);

  const handleSelectMessages = useCallback(async () => {
    if (!db) {
      setStatusMessage('Connect to the database first.');
      return;
    }

    try {
      const result = await db.getAllAsync<MessageRow>(
        'SELECT id, message FROM messages ORDER BY id DESC;'
      );
      setRows(result);
      setStatusMessage(`Fetched ${result.length} row(s).`);
    } catch (error) {
      setStatusMessage(`Select failed: ${(error as Error).message}`);
    }
  }, [db]);

  return {
    isConnected,
    messageInput,
    setMessageInput,
    rows,
    statusMessage,
    handleConnect,
    handleDisconnect,
    handleInsertMessage,
    handleSelectMessages,
  };
}