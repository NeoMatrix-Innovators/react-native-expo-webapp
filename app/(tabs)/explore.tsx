import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DataTable, Button } from 'react-native-paper';



export default function Explorer() {
  return (
    <SafeAreaProvider>


    <Button mode="contained"
    onPress={() => console.log('Press XOXO')} >Download
    </Button>
    </SafeAreaProvider>
  );
}
