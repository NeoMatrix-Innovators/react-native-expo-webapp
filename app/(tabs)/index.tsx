import React, { useState, useEffect } from 'react';
import { Text, View, Button, Alert, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const App = () => {
  // States für die Überprüfung der biometrischen Unterstützung und Authentifizierung
  const [hasBiometric, setHasBiometric] = useState(false);
  const [isBiometricEnrolled, setIsBiometricEnrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Beim Laden der App prüfen, ob biometrische Authentifizierung unterstützt wird
  useEffect(() => {
    const checkBiometricSupport = async () => {
      // Überprüfen, ob das Gerät biometrische Authentifizierung unterstützt
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setHasBiometric(compatible);

      if (compatible) {
        // Überprüfen, ob der Benutzer biometrische Daten registriert hat (Fingerabdruck oder Face-ID)
        const enrolled = await LocalAuthentication.isEnrolledAsync();
        setIsBiometricEnrolled(enrolled);
      }
    };

    checkBiometricSupport();
  }, []);

  // Funktion zum Starten der Authentifizierung mit Fingerabdruck
  const handleAuthentication = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authentifizieren Sie sich mit Ihrem Fingerabdruck',
        fallbackLabel: 'Benutzername/Passwort', // Optional: Fallback auf Passwort-Login
      });

      if (result.success) {
        setIsAuthenticated(true);
        Alert.alert('Erfolgreich!', 'Sie haben sich erfolgreich authentifiziert.');
      } else {
        setIsAuthenticated(false);
        Alert.alert('Fehlgeschlagen', 'Authentifizierung fehlgeschlagen.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Fehler', 'Ein Fehler ist aufgetreten.');
    }
  };

  if (!hasBiometric) {
    return (
      <View style={styles.container}>
        <Text>Dieses Gerät unterstützt keine biometrische Authentifizierung.</Text>
      </View>
    );
  }

  if (!isBiometricEnrolled) {
    return (
      <View style={styles.container}>
        <Text>Es sind keine biometrischen Daten auf diesem Gerät gespeichert. Bitte registrieren Sie einen Fingerabdruck.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Biometrische Authentifizierung</Text>
      <Button title="Mit Fingerabdruck einloggen" onPress={handleAuthentication} />
      {isAuthenticated && <Text style={styles.successText}>Erfolgreich authentifiziert!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  successText: {
    marginTop: 20,
    fontSize: 18,
    color: 'green',
  },
});

export default App;
