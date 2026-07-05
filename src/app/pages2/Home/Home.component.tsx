import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useHomeLogic } from './Home.logic';
import { styles } from './Home.styles';

export function HomeComponent() {
  const { handleNavigateToProfile } = useHomeLogic();
  const { handleNavigateToMap } = useHomeLogic();
  const { handleNavigateToSqlite } = useHomeLogic();
  const { handleNavigateToBarcodeScanner } = useHomeLogic();
  const { handleNavigateToQRScanner } = useHomeLogic();
  const { handleNavigateToFingerPrint } = useHomeLogic();
  const { handleNavigateToFileSave } = useHomeLogic();
  const { handleNavigateToPlayAudio } = useHomeLogic();
  const { handleNavigateToPlayVideo } = useHomeLogic();
  const { handleNavigateToMap2 } = useHomeLogic();


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleNavigateToProfile}>
        <Text style={styles.buttonText}>Go to Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNavigateToMap}>
        <Text style={styles.buttonText}>Go to Map</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNavigateToMap2}>
        <Text style={styles.buttonText}>Go to Map2</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNavigateToSqlite}>
        <Text style={styles.buttonText}>Go to Sqlite</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNavigateToBarcodeScanner}>
        <Text style={styles.buttonText}>Go to Barcode Scanner</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNavigateToQRScanner}>
        <Text style={styles.buttonText}>Go to QR Scanner</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNavigateToFingerPrint}>
        <Text style={styles.buttonText}>Go to FingerPrint</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNavigateToFileSave}>
        <Text style={styles.buttonText}>Go to File Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNavigateToPlayAudio}>
        <Text style={styles.buttonText}>Go to Play Audio</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNavigateToPlayVideo}>
        <Text style={styles.buttonText}>Go to Play Video</Text>
      </TouchableOpacity>
    </View>
  );
}