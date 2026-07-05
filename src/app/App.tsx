import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { BarcodeScannerComponent } from './Pages/BarCodeScanner/BarcodeScanner.component';
import { CameraComponent } from './Pages/Camera/Camera.component';
import { FileSavingComponent } from './Pages/FileSaving/FileSaving.component';
import { FingerPrintComponent } from './Pages/FingerPrint/FingerPrint.component';
import { MapComponent } from './Pages/Map/Map.component';
import { PlayAudioComponent } from './Pages/PlayAudio/PlayAudio.component';
import { PlayVideoComponent } from './Pages/PlayVideo/PlayVideo.component';
import { QRScannerComponent } from './Pages/QRScanner/QRScanner.component';
import { SqliteComponent } from './Pages/Sqlite/Sqlite.component';
import { HomeComponent } from './pages2/Home/Home.component';
import { ProfileComponent } from './pages2/Profile/Profile.component';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        
        <Stack.Screen 
          name="Home" 
          component={HomeComponent} 
          options={{ title: 'Home Overview' }} 
        />
        
        <Stack.Screen 
          name="Profile" 
          component={ProfileComponent} 
          options={{ title: 'User Profile' }} 
        />
        <Stack.Screen 
          name="Map" 
          component={MapComponent} 
          options={{ title: 'Map' }} 
        />
        <Stack.Screen 
          name="Map2" 
          component={MapComponent} 
          options={{ title: 'Map2' }} 
        />
        <Stack.Screen 
          name="Barcode" 
          component={BarcodeScannerComponent} 
          options={{ title: 'BarcodeScanner' }} 
        />
        <Stack.Screen 
          name="QrScanner" 
          component={QRScannerComponent} 
          options={{ title: 'QRScanner' }} 
        />
        <Stack.Screen 
          name="FingerPrint" 
          component={FingerPrintComponent} 
          options={{ title: 'FingerPrint' }} 
        />
        <Stack.Screen 
          name="Camera" 
          component={CameraComponent} 
          options={{ title: 'Camera' }} 
        />
        <Stack.Screen 
          name="Sqlite" 
          component={SqliteComponent} 
          options={{ title: 'Sqlite' }} 
        />
        <Stack.Screen 
          name="PlayAudio" 
          component={PlayAudioComponent} 
          options={{ title: 'PlayAudio' }} 
        />
        <Stack.Screen 
          name="PlayVideo" 
          component={PlayVideoComponent} 
          options={{ title: 'PlayVideo' }} 
        />
        <Stack.Screen 
          name="FileSave" 
          component={FileSavingComponent} 
          options={{ title: 'FileSave' }} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}