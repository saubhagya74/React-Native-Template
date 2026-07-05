import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useFingerPrintLogic } from './FingerPrint.logic';
import { styles } from './FingerPrint.styles';

export function FingerPrintComponent() {
  const { capabilities, authResult, isChecking, handleAuthenticate } =
    useFingerPrintLogic();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fingerprint / Biometrics</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Device Capabilities</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Has Hardware</Text>
          <Text style={styles.value}>
            {isChecking ? '...' : String(capabilities?.hasHardware ?? false)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Is Enrolled</Text>
          <Text style={styles.value}>
            {isChecking ? '...' : String(capabilities?.isEnrolled ?? false)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Supported Types</Text>
          <Text style={styles.value}>
            {isChecking
              ? '...'
              : capabilities?.supportedTypes.join(', ') || 'None'}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAuthenticate}>
        <Text style={styles.buttonText}>Authenticate</Text>
      </TouchableOpacity>

      {authResult && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Auth Result</Text>
          {authResult.success ? (
            <Text style={styles.successText}>Success ✅</Text>
          ) : (
            <>
              <Text style={styles.errorText}>Failed ❌</Text>
              {!!authResult.error && (
                <Text style={styles.label}>Error: {authResult.error}</Text>
              )}
              {!!authResult.warning && (
                <Text style={styles.warningText}>
                  Warning: {authResult.warning}
                </Text>
              )}
            </>
          )}
        </View>
      )}
    </View>
  );
}