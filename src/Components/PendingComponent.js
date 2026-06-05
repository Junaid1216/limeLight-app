import React from 'react';
import { View, Text } from 'react-native';

const PendingComponent = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}
    >
      <Text>Pending Data</Text>
    </View>
  );
};

export default PendingComponent;
