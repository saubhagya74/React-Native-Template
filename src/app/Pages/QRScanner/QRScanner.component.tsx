import { CameraView } from 'expo-camera';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useQRScannerLogic } from './QRScanner.logic';
import { styles } from './QRScanner.styles';

export function QRScannerComponent() {
  const {
    permission,
    requestPermission,
    isScanning,
    scannedType,
    scannedData,
    handleBarcodeScanned,
    handleClear,
    handleGoBack,
  } = useQRScannerLogic();

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          We need your permission to use the camera
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing="back"
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          onBarcodeScanned={isScanning ? handleBarcodeScanned : undefined}
        />

        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>‹ Back</Text>
        </TouchableOpacity>

        <View style={styles.scanFrame} pointerEvents="none" />
      </View>

      <View style={styles.infoContainer}>
        {scannedData ? (
          <>
            <Text style={styles.label}>Type</Text>
            <Text style={styles.value}>{scannedType}</Text>

            <Text style={styles.label}>Data</Text>
            <Text style={styles.value} numberOfLines={4}>
              {scannedData}
            </Text>

            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Text style={styles.clearButtonText}>Clear & Scan Again</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.placeholderText}>Point your camera at a QR code</Text>
        )}
      </View>
    </View>
  );
}