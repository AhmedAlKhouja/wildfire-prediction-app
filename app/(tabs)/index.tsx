import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";

// Define the type for earthquake data
interface Earthquake {
  id: string;
  location: string;
  time: string;
  magnitude: string;
}

const earthquakes: Earthquake[] = [
  { id: "1", location: "Pahala, Hawaii", time: "2 mins ago", magnitude: "2.60" },
  { id: "2", location: "Ocotillo Wells, CA", time: "10 mins ago", magnitude: "0.91" },
  { id: "3", location: "Ocotillo Wells, CA", time: "11 mins ago", magnitude: "0.77" },
  { id: "4", location: "30km W of Petrolia, CA", time: "17 mins ago", magnitude: "2.89" },
  { id: "5", location: "Cloverdale, CA", time: "23 mins ago", magnitude: "1.24" },
];

const EarthquakeAlertApp: React.FC = () => {
  const renderItem = ({ item }: { item: Earthquake }) => (
    <View style={styles.alertCard}>
      <Text style={styles.location}>{item.location}</Text>
      <Text style={styles.time}>{item.time}</Text>
      <Text style={styles.magnitude}>{item.magnitude}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>

      </View>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <Text style={styles.mapPlaceholderText}>Map Placeholder</Text>
      </View>

      {/* List of Earthquakes */}
      <FlatList
        data={earthquakes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />

      {/* Bottom Navigation */}
      <View style={styles.navigation}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Recent</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 47,
    backgroundColor: "#ff4a4a",
  },
  timeText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  iconText: { fontSize: 24, color: "#fff" },
  mapContainer: {
    height: 370,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  mapPlaceholderText: { color: "#666", fontSize: 18 },
  list: { flex: 1, paddingHorizontal: 20 },
  alertCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  location: { fontSize: 16, fontWeight: "bold" },
  time: { fontSize: 14, color: "#666" },
  magnitude: {
    fontSize: 16,
    color: "#fff",
    backgroundColor: "#ff4a4a",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  navButton: { alignItems: "center" },
  navText: { fontSize: 16, color: "#333" },
});

export default EarthquakeAlertApp;
