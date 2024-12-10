import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [areNotificationsEnabled, setAreNotificationsEnabled] = useState(true);
  const [regionAlerts, setRegionAlerts] = useState(false);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  const toggleNotifications = () => setAreNotificationsEnabled((prev) => !prev);
  const toggleRegionAlerts = () => setRegionAlerts((prev) => !prev);

  const handleClearCache = () => {
    Alert.alert(
      "Clear Cache",
      "Are you sure you want to clear all cached data?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => Alert.alert("Cache Cleared") },
      ]
    );
  };

  const handleSendFeedback = () => {
    Alert.alert("Send Feedback", "Redirecting to feedback form...");
    // Add your feedback form logic here
  };

  return (
    <ScrollView style={styles.container}>
      {/* General Settings */}
      <Text style={styles.sectionTitle}>General</Text>
      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>

      {/* Notifications */}
      <Text style={styles.sectionTitle}>Notifications</Text>
      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch
          value={areNotificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>
      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Region-Specific Alerts</Text>
        <Switch value={regionAlerts} onValueChange={toggleRegionAlerts} />
      </View>

      {/* Data Settings */}
      <Text style={styles.sectionTitle}>Data</Text>
      <TouchableOpacity style={styles.button} onPress={handleClearCache}>
        <Text style={styles.buttonText}>Clear Cache</Text>
      </TouchableOpacity>

      {/* Support and Feedback */}
      <Text style={styles.sectionTitle}>Support</Text>
      <TouchableOpacity style={styles.button} onPress={handleSendFeedback}>
        <Text style={styles.buttonText}>Send Feedback</Text>
      </TouchableOpacity>

      {/* About and Legal */}
      <Text style={styles.sectionTitle}>About</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Terms and Conditions</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>About the App</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
    marginTop: 50,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginVertical: 10,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  settingText: {
    fontSize: 16,
    color: "#333333",
  },
  button: {
    backgroundColor: "#FF7A30",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default SettingsScreen;
