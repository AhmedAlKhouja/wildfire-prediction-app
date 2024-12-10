import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Switch,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function DeclareScreen() {
  const [locationUrl, setLocationUrl] = useState("");
  const [rateOfSpread, setRateOfSpread] = useState("N/A");
  const [wind, setWind] = useState("N/A");
  const [vegetation, setVegetation] = useState("N/A");
  const [structures, setStructures] = useState("N/A");
  const [isEmergency, setIsEmergency] = useState(false);

  const [dropdownVisible, setDropdownVisible] = useState({
    rateOfSpread: false,
    wind: false,
    vegetation: false,
    structures: false,
  });

  const handleSubmit = () => {
    if (!locationUrl.trim()) {
      Alert.alert("Error", "Location URL is mandatory.");
      return;
    }

    const declarationData = {
      locationUrl,
      rateOfSpread,
      wind,
      vegetation,
      structures,
      isEmergency: isEmergency ? "Yes" : "No",
    };

    Alert.alert("Declaration Submitted", JSON.stringify(declarationData, null, 2));
  };

  const renderPickerWithDoneButton = (field, options, selectedValue, setSelectedValue) => {
    return (
      dropdownVisible[field] && (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedValue}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
            mode="dropdown"
          >
            {options.map((option) => (
              <Picker.Item key={option} label={option} value={option} />
            ))}
          </Picker>
          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => setDropdownVisible((prev) => ({ ...prev, [field]: false }))}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      )
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.header}>Declare a Wildfire</Text>

        {/* Location URL */}
        <TextInput
          style={styles.input}
          placeholder="Enter Location URL (Required)"
          value={locationUrl}
          onChangeText={setLocationUrl}
        />

        {/* Rate of Spread */}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() =>
            setDropdownVisible((prev) => ({ ...prev, rateOfSpread: !prev.rateOfSpread }))
          }
        >
          <Text style={styles.dropdownText}>Rate of Spread: {rateOfSpread}</Text>
        </TouchableOpacity>
        {renderPickerWithDoneButton("rateOfSpread", ["N/A", "Slow", "Moderate", "Rapid"], rateOfSpread, setRateOfSpread)}

        {/* Wind */}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setDropdownVisible((prev) => ({ ...prev, wind: !prev.wind }))}
        >
          <Text style={styles.dropdownText}>Wind: {wind}</Text>
        </TouchableOpacity>
        {renderPickerWithDoneButton("wind", ["N/A", "Light", "Moderate", "Strong"], wind, setWind)}

        {/* Vegetation */}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() =>
            setDropdownVisible((prev) => ({ ...prev, vegetation: !prev.vegetation }))
          }
        >
          <Text style={styles.dropdownText}>Vegetation: {vegetation}</Text>
        </TouchableOpacity>
        {renderPickerWithDoneButton("vegetation", ["N/A", "Light", "Moderate", "Abundance"], vegetation, setVegetation)}

        {/* Proximity to Structures */}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() =>
            setDropdownVisible((prev) => ({ ...prev, structures: !prev.structures }))
          }
        >
          <Text style={styles.dropdownText}>Proximity to Structures: {structures}</Text>
        </TouchableOpacity>
        {renderPickerWithDoneButton("structures", ["N/A", "Close", "Within Reach", "Far"], structures, setStructures)}

        {/* Emergency */}
        <View style={styles.emergencyContainer}>
          <Text style={styles.emergencyText}>Emergency 🚨</Text>
          <Switch
            value={isEmergency}
            onValueChange={setIsEmergency}
            thumbColor={isEmergency ? "#FF0000" : "#ccc"}
            trackColor={{ false: "#ddd", true: "#ddd" }} // Red circle, default iOS track
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 80, backgroundColor: "#fff" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF7A30",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#FF7A30",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  dropdownButton: {
    height: 50,
    justifyContent: "center",
    borderColor: "#FF7A30",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#F9F9F9",
  },
  dropdownText: { fontSize: 16, color: "#333" },
  pickerContainer: { marginBottom: 20 },
  picker: { height: 150 },
  doneButton: {
    alignSelf: "center",
    backgroundColor: "#FF7A30",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  doneButtonText: { color: "#fff", fontWeight: "bold" },
  emergencyContainer: {
    marginTop: 40,
    padding: 20,
    backgroundColor: "#FFF3F3",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  emergencyText: { fontSize: 18, fontWeight: "bold", color: "#FF0000" },
  button: {
    backgroundColor: "#FF7A30",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { fontSize: 18, fontWeight: "bold", color: "#fff" },
});