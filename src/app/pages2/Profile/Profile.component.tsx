import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useProfileLogic } from './Profile.logic';
import { styles } from './Profile.styles';

export function ProfileComponent() {
  const { handleNavigateToProfile } = useProfileLogic();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleNavigateToProfile}>
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}