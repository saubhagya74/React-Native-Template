import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useCameraLogic } from './Camera.logic';
import { styles } from './Camera.styles';

export function CameraComponent() {
  const {
    savedPhotos,
    lastPhotoUri,
    statusMessage,
    isLoading,
    handleTakeAndSavePhoto,
    handleDeletePhoto,
  } = useCameraLogic();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camera</Text>

      {lastPhotoUri && (
        <Image source={{ uri: lastPhotoUri }} style={styles.previewImage} />
      )}

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleTakeAndSavePhoto}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Working...' : 'Take & Save Photo'}
        </Text>
      </TouchableOpacity>

      {!!statusMessage && <Text style={styles.statusText}>{statusMessage}</Text>}

      <View style={styles.listContainer}>
        <Text style={styles.listHeader}>Saved Photos</Text>

        {savedPhotos.length === 0 ? (
          <Text style={styles.emptyText}>No photos saved yet.</Text>
        ) : (
          <FlatList
            data={savedPhotos}
            keyExtractor={(item) => item.uri}
            horizontal
            contentContainerStyle={styles.thumbnailRow}
            renderItem={({ item }) => (
              <View style={styles.thumbnailWrapper}>
                <Image source={{ uri: item.uri }} style={styles.thumbnail} />
                <TouchableOpacity
                  style={styles.deleteBadge}
                  onPress={() => handleDeletePhoto(item.uri)}
                >
                  <Text style={styles.deleteBadgeText}>x</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}