import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

export default function Predictions() {
  const [locationId, setLocationId] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [vegetationIndex, setVegetationIndex] = useState("");

  const handleSubmit = () => {
    const inputData = {
      location_id: parseInt(locationId),
      temperature: parseFloat(temperature),
      humidity: parseFloat(humidity),
      wind_speed: parseFloat(windSpeed),
      vegetation_index: parseFloat(vegetationIndex),
    };

    Alert.alert("Input Data", JSON.stringify(inputData, null, 2));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.header}>Input Data</Text>

        <TextInput
          style={styles.input}
          placeholder="Location URL"
          keyboardType="numeric"
          value={locationId}
          onChangeText={setLocationId}
          returnKeyType="done"
        />
        <TextInput
          style={styles.input}
          placeholder="Temperature (°C)"
          keyboardType="numeric"
          value={temperature}
          onChangeText={setTemperature}
          returnKeyType="done"
        />
        <TextInput
          style={styles.input}
          placeholder="Humidity (%)"
          keyboardType="numeric"
          value={humidity}
          onChangeText={setHumidity}
          returnKeyType="done"
        />
        <TextInput
          style={styles.input}
          placeholder="Wind Speed (km/h)"
          keyboardType="numeric"
          value={windSpeed}
          onChangeText={setWindSpeed}
          returnKeyType="done"
        />
        <TextInput
          style={styles.input}
          placeholder="Vegetation Index"
          keyboardType="numeric"
          value={vegetationIndex}
          onChangeText={setVegetationIndex}
          returnKeyType="done"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#FF8A2D",
  },
  input: {
    height: 50,
    borderColor: "#FF8A2D",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#FF8A2D",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
