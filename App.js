import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RoleProvider } from './src/Context/RoleContext';
import MainNavigation from './src/Navigations/MainNavigation';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <RoleProvider>
          <MainNavigation />
        </RoleProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
