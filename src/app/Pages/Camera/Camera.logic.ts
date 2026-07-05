import { Paths, Directory, File } from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useEffect, useState } from 'react';

const photoDir = new Directory(Paths.document, 'saved-photos');

export interface SavedPhoto {
  name: string;
  uri: string;
}

export function useCameraLogic() {
  const [savedPhotos, setSavedPhotos] = useState<SavedPhoto[]>([]);
  const [lastPhotoUri, setLastPhotoUri] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refreshSavedPhotos = useCallback(async () => {
    try {
      if (!photoDir.exists) {
        photoDir.create();
      }

      const items = photoDir.list();
      
      const photos: SavedPhoto[] = items
        .filter((item: any): item is File => item instanceof File)
        .map((file: File) => ({
          name: file.name,
          uri: file.uri,
        }));

      setSavedPhotos(photos);
      if (photos.length > 0) {
        setLastPhotoUri(photos[photos.length - 1].uri);
      } else {
        setLastPhotoUri(null);
      }
    } catch (error) {
      setStatusMessage(`Failed to read saved photos: ${(error as Error).message}`);
    }
  }, []);

  const handleTakeAndSavePhoto = useCallback(async () => {
    try {
      setIsLoading(true);
      setStatusMessage('');

      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        setStatusMessage('Camera permission was denied.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        quality: 0.7,
        allowsEditing: false,
      });

      if (result.canceled) {
        setStatusMessage('Photo capture cancelled.');
        return;
      }

      const asset = result.assets[0];
      
      if (!photoDir.exists) {
        photoDir.create();
      }

      const fileName = `photo-${Date.now()}.jpg`;
      
      const sourceFile = new File(asset.uri);
      const destinationFile = new File(photoDir, fileName);
      
      sourceFile.copy(destinationFile);

      setLastPhotoUri(destinationFile.uri);
      setStatusMessage('Photo saved successfully.');
      await refreshSavedPhotos();
    } catch (error) {
      setStatusMessage(`Failed to take photo: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  }, [refreshSavedPhotos]);

  const handleDeletePhoto = useCallback(
    async (uri: string) => {
      try {
        const fileToDelete = new File(uri);
        if (fileToDelete.exists) {
          fileToDelete.delete();
        }

        if (lastPhotoUri === uri) {
          setLastPhotoUri(null);
        }
        await refreshSavedPhotos();
      } catch (error) {
        setStatusMessage(`Failed to delete photo: ${(error as Error).message}`);
      }
    },
    [lastPhotoUri, refreshSavedPhotos]
  );

  useEffect(() => {
    refreshSavedPhotos();
  }, [refreshSavedPhotos]);

  return {
    savedPhotos,
    lastPhotoUri,
    statusMessage,
    isLoading,
    handleTakeAndSavePhoto,
    handleDeletePhoto,
  };
}