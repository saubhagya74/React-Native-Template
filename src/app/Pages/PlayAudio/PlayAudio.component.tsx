import React from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { usePlayAudioLogic } from './PlayAudio.logic';
import { styles } from './PlayAudio.styles';

function formatTime(seconds: number): string {
  const total = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function PlayAudioComponent() {
  const {
    fileName,
    statusMessage,
    hasSource,
    isPlaying,
    currentTime,
    duration,
    handlePickAudio,
    handlePlayPause,
    handleStop,
    handleSeek,
  } = usePlayAudioLogic();

  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Play Audio</Text>
      <Text style={styles.fileName}>{fileName || 'No audio selected'}</Text>

      <Pressable
        style={styles.progressTrack}
        onPress={(event) => {
          if (!duration) return;
          const ratio = event.nativeEvent.locationX / 280;
          handleSeek(Math.min(Math.max(ratio, 0), 1) * duration);
        }}
      >
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </Pressable>

      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>

      {!!statusMessage && <Text style={styles.status}>{statusMessage}</Text>}

      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={handlePickAudio}>
          <Text style={styles.buttonText}>Pick Audio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !hasSource && styles.buttonDisabled]}
          onPress={handlePlayPause}
          disabled={!hasSource}
        >
          <Text style={styles.buttonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !hasSource && styles.buttonDisabled]}
          onPress={handleStop}
          disabled={!hasSource}
        >
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}