// ./(tabs)/declare.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DeclareScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Declare Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});
