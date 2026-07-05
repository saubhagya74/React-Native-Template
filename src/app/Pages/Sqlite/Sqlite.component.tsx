import React from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSqliteLogic } from './Sqlite.logic';
import { styles } from './Sqlite.styles';

export function SqliteComponent() {
  const {
    isConnected,
    messageInput,
    setMessageInput,
    rows,
    statusMessage,
    handleConnect,
    handleDisconnect,
    handleInsertMessage,
    handleSelectMessages,
  } = useSqliteLogic();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SQLite</Text>

      <Text
        style={[
          styles.statusBadge,
          isConnected ? styles.connectedBadge : styles.disconnectedBadge,
        ]}
      >
        {isConnected ? 'Connected ●' : 'Disconnected ○'}
      </Text>

      <View style={styles.connectionRow}>
        <TouchableOpacity
          style={[styles.button, isConnected && styles.buttonDisabled]}
          onPress={handleConnect}
          disabled={isConnected}
        >
          <Text style={styles.buttonText}>Connect</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.disconnectButton,
            !isConnected && styles.buttonDisabled,
          ]}
          onPress={handleDisconnect}
          disabled={!isConnected}
        >
          <Text style={styles.buttonText}>Disconnect</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Type a message to insert..."
        value={messageInput}
        onChangeText={setMessageInput}
        editable={isConnected}
      />

      <TouchableOpacity
        style={[styles.actionButton, !isConnected && styles.buttonDisabled]}
        onPress={handleInsertMessage}
        disabled={!isConnected}
      >
        <Text style={styles.buttonText}>Insert</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionButton, !isConnected && styles.buttonDisabled]}
        onPress={handleSelectMessages}
        disabled={!isConnected}
      >
        <Text style={styles.buttonText}>Select All</Text>
      </TouchableOpacity>

      {!!statusMessage && <Text style={styles.statusText}>{statusMessage}</Text>}

      <View style={styles.listContainer}>
        <Text style={styles.listHeader}>Messages Table</Text>

        {rows.length === 0 ? (
          <Text style={styles.emptyText}>No rows loaded. Tap "Select All".</Text>
        ) : (
          <FlatList
            data={rows}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.rowId}>#{item.id}</Text>
                <Text style={styles.rowMessage}>{item.message}</Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}