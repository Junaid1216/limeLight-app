import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Colors } from '../../Constants/Colors';

const Training = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default Training;
