import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function TabBarBackground() {
  const colorScheme = useColorScheme();
  return (
    <View style={[styles.tabBarBackground, { backgroundColor: Colors[colorScheme ?? 'light'].background }]} />
  );
}

const styles = StyleSheet.create({
  tabBarBackground: {
    height: 60,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});
