import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import * as DocumentPicker from 'expo-document-picker';
import { useCallback, useState } from 'react';

export function usePlayAudioLogic() {
  const [source, setSource] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState('');

  const player = useAudioPlayer(source ?? undefined);
  const status = useAudioPlayerStatus(player);

  const handlePickAudio = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        copyToCacheDirectory: true,
      });
      if (result.canceled) return;

      setSource(result.assets[0].uri);
      setFileName(result.assets[0].name);
      setStatusMessage(`Loaded "${result.assets[0].name}"`);
    } catch (error) {
      setStatusMessage(`Failed to pick audio: ${(error as Error).message}`);
    }
  }, []);

  const handlePlayPause = useCallback(() => {
    if (!source) {
      setStatusMessage('Pick an audio file first.');
      return;
    }
    if (status.playing) {
      player.pause();
    } else {
      if (status.currentTime >= (status.duration ?? 0) && status.duration > 0) {
        player.seekTo(0);
      }
      player.play();
    }
  }, [player, status.playing, status.currentTime, status.duration, source]);

  const handleStop = useCallback(() => {
    player.pause();
    player.seekTo(0);
  }, [player]);

  const handleSeek = useCallback(
    (seconds: number) => {
      player.seekTo(seconds);
    },
    [player]
  );

  return {
    fileName,
    statusMessage,
    hasSource: !!source,
    isPlaying: status.playing,
    currentTime: status.currentTime ?? 0,
    duration: status.duration ?? 0,
    handlePickAudio,
    handlePlayPause,
    handleStop,
    handleSeek,
  };
}