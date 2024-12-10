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
  const [crownFires, setCrownFires] = useState(false);
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
      crownFires: crownFires ? "Yes" : "No",
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
        {renderPickerWithDoneButton("rateOfSpread", ["Rapidly", "Moderately", "Slowly", "N/A"], rateOfSpread, setRateOfSpread)}

        {/* Crown Fires */}
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Crown Fires</Text>
          <Switch
            value={crownFires}
            onValueChange={setCrownFires}
            thumbColor={crownFires ? "#FF8A2D" : "#ccc"}
          />
        </View>

        {/* Wind */}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() =>
            setDropdownVisible((prev) => ({ ...prev, wind: !prev.wind }))
          }
        >
          <Text style={styles.dropdownText}>Wind: {wind}</Text>
        </TouchableOpacity>
        {renderPickerWithDoneButton("wind", ["Strong", "Moderate", "N/A"], wind, setWind)}

        {/* Vegetation */}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() =>
            setDropdownVisible((prev) => ({ ...prev, vegetation: !prev.vegetation }))
          }
        >
          <Text style={styles.dropdownText}>Vegetation: {vegetation}</Text>
        </TouchableOpacity>
        {renderPickerWithDoneButton("vegetation", ["A lot", "Moderate", "A little", "Nothing"], vegetation, setVegetation)}

        {/* Proximity to Structures */}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() =>
            setDropdownVisible((prev) => ({ ...prev, structures: !prev.structures }))
          }
        >
          <Text style={styles.dropdownText}>Proximity to Structures: {structures}</Text>
        </TouchableOpacity>
        {renderPickerWithDoneButton("structures", ["Far", "Near", "No Structures"], structures, setStructures)}

        {/* Emergency */}
        <View style={styles.emergencyContainer}>
          <Text style={styles.emergencyText}>Emergency 🚨</Text>
          <Switch
            value={isEmergency}
            onValueChange={setIsEmergency}
            thumbColor={isEmergency ? "#FF0000" : "#ccc"}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Declaration</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: "#fff" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF8A2D",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#FF8A2D",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  dropdownButton: {
    height: 50,
    justifyContent: "center",
    borderColor: "#FF8A2D",
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
    backgroundColor: "#FF8A2D",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  doneButtonText: { color: "#fff", fontWeight: "bold" },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  label: { fontSize: 16, color: "#333" },
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
    backgroundColor: "#FF8A2D",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { fontSize: 18, fontWeight: "bold", color: "#fff" },
});
