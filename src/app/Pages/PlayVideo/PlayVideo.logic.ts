import * as DocumentPicker from 'expo-document-picker';
import { useVideoPlayer } from 'expo-video';
import { useCallback, useEffect, useState } from 'react';

export function usePlayVideoLogic() {
  const [source, setSource] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const player = useVideoPlayer(source ?? '', (p) => {
    p.loop = false;
  });

  useEffect(() => {
    const subscription = player.addListener('playingChange', (event) => {
      setIsPlaying(event.isPlaying);
    });
    return () => subscription.remove();
  }, [player]);

  const handlePickVideo = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*',
        copyToCacheDirectory: true,
      });
      if (result.canceled) return;

      setSource(result.assets[0].uri);
      setFileName(result.assets[0].name);
      setStatusMessage(`Loaded "${result.assets[0].name}"`);
    } catch (error) {
      setStatusMessage(`Failed to pick video: ${(error as Error).message}`);
    }
  }, []);

  const handlePlayPause = useCallback(() => {
    if (!source) {
      setStatusMessage('Pick a video file first.');
      return;
    }
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
  }, [player, source]);

  const handleReplay = useCallback(() => {
    if (!source) return;
    player.currentTime = 0;
    player.play();
  }, [player, source]);

  return {
    player,
    fileName,
    isPlaying,
    hasSource: !!source,
    statusMessage,
    handlePickVideo,
    handlePlayPause,
    handleReplay,
  };
}