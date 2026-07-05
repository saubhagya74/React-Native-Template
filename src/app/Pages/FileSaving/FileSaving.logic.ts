import * as DocumentPicker from 'expo-document-picker';
import { Directory, File, Paths } from 'expo-file-system';
import { useCallback, useEffect, useState } from 'react';

export const saveDir = new Directory(Paths.document, 'saved-files');

export interface SavedFile {
  name: string;
  uri: string;
  size?: number;
}

export function useFileSavingLogic() {
  const [savedFiles, setSavedFiles] = useState<SavedFile[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refreshSavedFiles = useCallback(async () => {
    try {
      if (!saveDir.exists) {
        saveDir.create();
      }

      const items = saveDir.list();

      const files: SavedFile[] = items
        .filter((item): item is File => item instanceof File)
        .map((file) => ({
          name: file.name,
          uri: file.uri,
          size: file.size ?? undefined,
        }));

      setSavedFiles(files);
    } catch (error) {
      setStatusMessage(`Failed to read saved files: ${(error as Error).message}`);
    }
  }, []);

  const handlePickAndSaveFile = useCallback(async () => {
    try {
      setIsLoading(true);
      setStatusMessage('');

      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        setStatusMessage('File selection cancelled.');
        return;
      }

      const pickedAsset = result.assets[0];

      if (!saveDir.exists) {
        saveDir.create();
      }

      const sourceFile = new File(pickedAsset.uri);
      const destinationFile = new File(saveDir, pickedAsset.name);

      sourceFile.copy(destinationFile);

      setStatusMessage(`Saved "${pickedAsset.name}" successfully.`);
      await refreshSavedFiles();
    } catch (error) {
      setStatusMessage(`Failed to save file: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  }, [refreshSavedFiles]);

  const handleDeleteFile = useCallback(
    async (uri: string) => {
      try {
        const fileToDelete = new File(uri);
        if (fileToDelete.exists) {
          fileToDelete.delete();
        }
        setStatusMessage('File deleted.');
        await refreshSavedFiles();
      } catch (error) {
        setStatusMessage(`Failed to delete file: ${(error as Error).message}`);
      }
    },
    [refreshSavedFiles]
  );

  useEffect(() => {
    refreshSavedFiles();
  }, [refreshSavedFiles]);

  return {
    savedFiles,
    statusMessage,
    isLoading,
    handlePickAndSaveFile,
    handleDeleteFile,
    refreshSavedFiles,
  };
}