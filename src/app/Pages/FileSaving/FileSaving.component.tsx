import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useFileSavingLogic } from './FileSaving.logic';
import { styles } from './FileSaving.styles';

export function FileSavingComponent() {
  const {
    savedFiles,
    statusMessage,
    isLoading,
    handlePickAndSaveFile,
    handleDeleteFile,
  } = useFileSavingLogic();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>File Saving</Text>

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handlePickAndSaveFile}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Saving...' : 'Pick & Save File'}
        </Text>
      </TouchableOpacity>

      {!!statusMessage && <Text style={styles.statusText}>{statusMessage}</Text>}

      <View style={styles.listContainer}>
        <Text style={styles.listHeader}>Saved Files</Text>

        {savedFiles.length === 0 ? (
          <Text style={styles.emptyText}>No files saved yet.</Text>
        ) : (
          <FlatList
            data={savedFiles}
            keyExtractor={(item) => item.uri}
            renderItem={({ item }) => (
              <View style={styles.fileRow}>
                <View style={{ flexShrink: 1 }}>
                  <Text style={styles.fileName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  {item.size !== undefined && (
                    <Text style={styles.fileSize}>{item.size} bytes</Text>
                  )}
                </View>
                <TouchableOpacity onPress={() => handleDeleteFile(item.uri)}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}