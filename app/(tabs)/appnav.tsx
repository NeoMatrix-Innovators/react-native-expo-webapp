import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DownloadTable from './download';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Download" component={DownloadTable} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

