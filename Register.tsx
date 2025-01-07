import React, { useState, useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import * as LocalAuthentication from 'expo-local-authentication';
import { AuthContext } from '../contexts/AuthContext';
import { authenticateUser } from '../services/authService';

const RegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { signIn } = useContext(AuthContext as React.Context<{ signIn: () => void }>);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const isAuthenticated = await authenticateUser(username, password);
    if (isAuthenticated) {
      signIn();
    } else {
      Alert.alert('Fehler', 'Ungültige Anmeldedaten');
    }
  };

  const handleBiometricAuth = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      Alert.alert('Biometrie nicht verfügbar');
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Mit Fingerabdruck anmelden',
    });

    if (result.success) {
      signIn();
    } else {
      Alert.alert('Fehler', 'Fingerabdruck nicht erkannt');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Benutzername"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        label="Passwort"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button mode="contained" onPress={handleLogin}>
        Anmelden
      </Button>
      <Button mode="outlined" onPress={handleBiometricAuth}>
        Mit Fingerabdruck anmelden
      </Button>
      <Text onPress={() => navigation.navigate('Register')}>Noch kein Konto? Registrieren</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});

export default RegisterScreen;