import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

// Define the type for wildfire data
interface Wildfire {
  id: string;
  location: string;
  time: string;
  magnitude: string | null;
}

const wildfires: Wildfire[] = [
  {
    id: "1",
    location: "Pahala, Hawaii",
    time: "2 mins ago",
    magnitude: "2.60",
  },
  {
    id: "2",
    location: "Ocotillo Wells, CA",
    time: "10 mins ago",
    magnitude: "0.91",
  },
  {
    id: "3",
    location: "Ocotillo Wells, CA",
    time: "11 mins ago",
    magnitude: "0.77",
  },
  {
    id: "4",
    location: "30km W of Petrolia, CA",
    time: "17 mins ago",
    magnitude: "2.89",
  },
  {
    id: "5",
    location: "Cloverdale, CA",
    time: "23 mins ago",
    magnitude: "1.24",
  },
  {
    id: "6",
    location: "Los Angeles, CA",
    time: "30 mins ago",
    magnitude: "3.12",
  },
  {
    id: "7",
    location: "San Francisco, CA",
    time: "1 hour ago",
    magnitude: "4.00",
  },
  { id: "8", location: "Seattle, WA", time: "2 hours ago", magnitude: "1.92" },
  { id: "9", location: "Phoenix, AZ", time: "4 hours ago", magnitude: "2.88" },
  { id: "10", location: "Denver, CO", time: "6 hours ago", magnitude: "2.34" },
  { id: "11", location: "Miami, FL", time: "12 hours ago", magnitude: "1.75" },
  { id: "12", location: "New York, NY", time: "1 day ago", magnitude: "3.45" },
  { id: "13", location: "Chicago, IL", time: "2 days ago", magnitude: "2.18" },
];

const WildfireItem: React.FC<{ item: Wildfire }> = ({ item }) => (
  <View style={styles.alertCard}>
    <View style={styles.leftSection}>
      <Text style={styles.location}>{item.location}</Text>
      <Text style={styles.additionalInfo}>{item.time}</Text>
    </View>
    <View style={styles.rightSection}>
      <View style={styles.magnitudeContainer}>
        {item.magnitude ? (
          <Text style={styles.magnitude}>{item.magnitude}</Text>
        ) : (
          <Text style={styles.noData}>No data available</Text>
        )}
      </View>
    </View>
  </View>
);

const WildfirePredictionApp: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}></Text>
      </View>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: 37.7749, // Default to San Francisco
            longitude: -122.4194,
            latitudeDelta: 10,
            longitudeDelta: 10,
          }}
        >
          {wildfires.map((fire) => (
            <Marker
              key={fire.id}
              coordinate={{
                latitude: Math.random() * (49 - 25) + 25, // Mock latitude for testing
                longitude: Math.random() * (-125 - -66) + -66, // Mock longitude for testing
              }}
              title={fire.location}
              description={`FDI: ${fire.magnitude || "N/A"}, Time: ${fire.time}`}
            />
          ))}
        </MapView>
      </View>

      {/* List of Wildfires */}
      <FlatList
        data={wildfires.slice().reverse()} // Reverse the array for the inverted effect
        renderItem={({ item }) => <WildfireItem item={item} />}
        keyExtractor={(item) => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={10}
        inverted={true} // Ensures the last item appears last and stays visible
        ListEmptyComponent={
          <Text style={styles.emptyListText}>No wildfire data available.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 37,
    backgroundColor: "#FF7A30",
  },
  headerText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  mapContainer: {
    height: 370,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  mapPlaceholderText: { color: "#666", fontSize: 18 },
  list: { flex: 1, paddingHorizontal: 20, marginBottom: 82.5 },
  alertCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  leftSection: {
    flex: 1,
  },
  location: { fontSize: 16, fontWeight: "bold" },
  additionalInfo: { fontSize: 12, color: "#666", marginTop: 2 },
  rightSection: {
    alignItems: "flex-end",
  },
  magnitudeContainer: {
    backgroundColor: "#FF7A30",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 5,
  },
  magnitude: { fontSize: 16, color: "#fff" },
  noData: { fontSize: 16, color: "#888" },
  timeInfo: { fontSize: 12, color: "#666" },
  emptyListText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    marginTop: 20,
  },
});

export default WildfirePredictionApp;
