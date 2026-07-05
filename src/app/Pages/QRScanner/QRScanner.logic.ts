import { useNavigation } from '@react-navigation/native';
import { useCameraPermissions, type BarcodeScanningResult } from 'expo-camera';
import { useCallback, useState } from 'react';

export function useQRScannerLogic() {
  const navigation = useNavigation<any>();
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(true);
  const [scannedType, setScannedType] = useState<string | null>(null);
  const [scannedData, setScannedData] = useState<string | null>(null);

  const handleBarcodeScanned = useCallback(
    (result: BarcodeScanningResult) => {
      if (!isScanning) return;
      setIsScanning(false); // stops the scanner
      setScannedType(result.type);
      setScannedData(result.data);
    },
    [isScanning]
  );

  const handleClear = useCallback(() => {
    setScannedType(null);
    setScannedData(null);
    setIsScanning(true); // resumes the scanner
  }, []);

  const handleGoBack = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  return {
    permission,
    requestPermission,
    isScanning,
    scannedType,
    scannedData,
    handleBarcodeScanned,
    handleClear,
    handleGoBack,
  };
}