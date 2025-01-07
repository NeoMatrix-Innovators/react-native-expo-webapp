import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const Login: React.FC = () => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Überprüfen, ob biometrische Authentifizierung unterstützt wird
  useEffect(() => {
    const checkBiometricSupport = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    };
    checkBiometricSupport();
  }, []);

  // Authentifizierung starten
  const handleBiometricAuth = async () => {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) {
      return Alert.alert('Fehler', 'Keine biometrischen Daten gespeichert.');
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Mit Fingerabdruck oder Gesichtserkennung anmelden',
      fallbackLabel: 'PIN eingeben',
      disableDeviceFallback: true,
    });

    if (result.success) {
      setIsAuthenticated(true);
      Alert.alert('Erfolg', 'Erfolgreich angemeldet!');
    } else {
      Alert.alert('Fehlgeschlagen', 'Authentifizierung fehlgeschlagen.');
    }
  };

  const handleLogin = () => {
    if (username === 'admin' && password === '1234') {
      Alert.alert('Erfolg', 'Erfolgreich angemeldet!');
      setIsAuthenticated(true);
    } else {
      Alert.alert('Fehler', 'Falscher Benutzername oder Passwort.');
    }
  };

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <Text style={styles.welcomeText}>Willkommen! Zugriff gewährt.</Text>
      ) : (
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Benutzername"
            onChangeText={setUsername}
            value={username}
          />
          <TextInput
            style={styles.input}
            placeholder="Passwort"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Anmelden</Text>
          </TouchableOpacity>

          {isBiometricSupported && (
            <TouchableOpacity style={styles.fingerprintButton} onPress={handleBiometricAuth}>
              <Text style={styles.buttonText}>Mit Fingerabdruck anmelden</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  loginContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 50,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  fingerprintButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Login;
