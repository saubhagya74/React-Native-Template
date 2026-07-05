import { VideoView } from 'expo-video';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { usePlayVideoLogic } from './PlayVideo.logic';
import { styles } from './PlayVideo.styles';

export function PlayVideoComponent() {
  const {
    player,
    fileName,
    isPlaying,
    hasSource,
    statusMessage,
    handlePickVideo,
    handlePlayPause,
    handleReplay,
  } = usePlayVideoLogic();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Play Video</Text>
      <Text style={styles.fileName}>{fileName || 'No video selected'}</Text>

      <VideoView
        style={styles.video}
        player={player}
        fullscreenOptions={{
            enable: true, 
        }}
        allowsPictureInPicture
        nativeControls={false}
      />

      {!!statusMessage && <Text style={styles.status}>{statusMessage}</Text>}

      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={handlePickVideo}>
          <Text style={styles.buttonText}>Pick Video</Text>
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
          onPress={handleReplay}
          disabled={!hasSource}
        >
          <Text style={styles.buttonText}>Replay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}