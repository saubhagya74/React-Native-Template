import { useNavigation } from '@react-navigation/native';

export function useHomeLogic() {
  const navigation = useNavigation<any>();

  const handleNavigateToProfile = () => {
    navigation.navigate('Profile'); // Fixed to match name="Profile"
  };

  const handleNavigateToMap = () => {
    navigation.navigate('Map');
  };

  const handleNavigateToSqlite = () => {
    navigation.navigate('Sqlite');
  };

  const handleNavigateToBarcodeScanner = () => {
    navigation.navigate('Barcode'); // Fixed to match name="Barcode"
  };

  const handleNavigateToQRScanner = () => {
    navigation.navigate('QrScanner'); // Fixed to match name="QrScanner"
  };

  const handleNavigateToFingerPrint = () => {
    navigation.navigate('FingerPrint');
  };
  const handleNavigateToFileSave = () => {
    navigation.navigate('FileSave');
  };
  const handleNavigateToPlayAudio = () => {
    navigation.navigate('PlayAudio');
  };
  const handleNavigateToPlayVideo = () => {
    navigation.navigate('PlayVideo');
  };
  const handleNavigateToMap2= () => {
    navigation.navigate('Map2');
  };

  return {
    handleNavigateToProfile,
    handleNavigateToMap,
    handleNavigateToSqlite,
    handleNavigateToBarcodeScanner,
    handleNavigateToQRScanner,
    handleNavigateToFingerPrint,
    handleNavigateToFileSave,
    handleNavigateToPlayAudio,
    handleNavigateToPlayVideo,
    handleNavigateToMap2,
  };
}