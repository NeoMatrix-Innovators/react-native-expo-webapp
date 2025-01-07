import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../theme/theme';
import NewsList from '../components/NewsList';

export default function News() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NewsList />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
