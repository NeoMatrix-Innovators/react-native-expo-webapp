import React, { useState } from 'react';
import { Alert } from 'react-native';




const Register = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [attempts, setAttempts] = useState(0); // Anzahl der Fehlversuche

  const MAX_ATTEMPTS = 3; // Maximale Versuche



  const handleLogin = () => {
    if (attempts >= MAX_ATTEMPTS) {
      Alert.alert('Fehler', 'Zu viele Fehlversuche. Zugang gesperrt!');
      console.log('Console: Zugriff gesperrt!');
      return;
    }

    if (username === 'hexzhen3x7' && password === 'x3pc09220196') {
      Alert.alert('Erfolg', 'Erfolgreich angemeldet!');
      console.log('Console: Erfolgreich angemeldet!');
      setIsAuthenticated(true);
      setAttempts(0); // Zurücksetzen der Versuche bei Erfolg
    } else {
      const remainingAttempts = MAX_ATTEMPTS - attempts - 1; // Restliche Versuche berechnen
      setAttempts(attempts + 1); // Fehlversuch erhöhen

      Alert.alert(
        'Fehler',
        `Falscher Benutzername oder Passwort. Noch ${remainingAttempts} Versuche übrig.`
      );
      console.log(`Console: Fehlgeschlagener Versuch ${attempts + 1}`);
    }
  };



  
  return (
    <>
      {/* Hier würde die Login-Oberfläche mit Eingabefeldern für Benutzername und Passwort eingefügt werden */}
    </>
  );
};

export default Register;
