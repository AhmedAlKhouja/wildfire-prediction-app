import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import countriesData from "world-countries";

// Define the wildfire type
export type Wildfire = {
  id: number;
  country: string;
  severity: string;
  date: string; // Date as string for simplicity
};

// Example data
export const wildfires: Wildfire[] = [
  {
    id: 1,
    country: "United States",
    severity: "High (31-50)",
    date: "2024-12-01",
  },
  {
    id: 2,
    country: "Morocco",
    severity: "Moderate (11-30)",
    date: "2024-12-03",
  },
  { id: 3, country: "France", severity: "Low (0-10)", date: "2024-11-28" },
];

const SearchScreen = () => {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedSeverity, setSelectedSeverity] = useState("All Severities");
  const [countries, setCountries] = useState<
    { label: string; value: string }[]
  >([]);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [showSeverityPicker, setShowSeverityPicker] = useState(false);
  const [searchResults, setSearchResults] = useState<Wildfire[]>([]);

  const severities = [
    { label: "All Severities", value: "all" },
    { label: "Low (0-10)", value: "Low (0-10)" },
    { label: "Moderate (11-30)", value: "Moderate (11-30)" },
    { label: "High (31-50)", value: "High (31-50)" },
    { label: "Very High (51-75)", value: "Very High (51-75)" },
    { label: "Extreme (76-100)", value: "Extreme (76-100)" },
  ];

  useEffect(() => {
    const countryList: { label: string; value: string }[] = [
      { label: "All Countries", value: "all" },
      ...countriesData
        .map((country) => ({
          label: country.name.common,
          value: country.cca2,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    ];
    setCountries(countryList);
  }, []);

  const onFromDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowFromDatePicker(false);
    if (selectedDate) {
      setFromDate(selectedDate);
    }
  };

  const onToDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowToDatePicker(false);
    if (selectedDate) {
      setToDate(selectedDate);
    }
  };

  const performSearch = () => {
    const filteredWildfires = wildfires.filter((wildfire) => {
      const matchesCountry =
        selectedCountry === "All Countries" ||
        wildfire.country === selectedCountry;
      const matchesSeverity =
        selectedSeverity === "All Severities" ||
        wildfire.severity === selectedSeverity;
      const matchesDate =
        (!fromDate || new Date(wildfire.date) >= fromDate) &&
        (!toDate || new Date(wildfire.date) <= toDate);

      return matchesCountry && matchesSeverity && matchesDate;
    });

    setSearchResults(filteredWildfires);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <Text style={styles.title}>Wildfire Search</Text>
        </View>

        <View style={styles.filterRow}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowCountryPicker(true)}
          >
            <Text style={styles.filterText}>{selectedCountry}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowSeverityPicker(true)}
          >
            <Text style={styles.filterText}>{selectedSeverity}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.datePickerContainer}>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowFromDatePicker(true)}
        >
          <Text style={styles.dateText}>
            {fromDate ? fromDate.toDateString() : "Select From Date"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.toText}>to</Text>

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowToDatePicker(true)}
        >
          <Text style={styles.dateText}>
            {toDate ? toDate.toDateString() : "Select To Date"}
          </Text>
        </TouchableOpacity>
      </View>

      {showFromDatePicker && (
        <DateTimePicker
          value={fromDate || new Date()}
          mode="date"
          display="default"
          onChange={onFromDateChange}
        />
      )}

      {showToDatePicker && (
        <DateTimePicker
          value={toDate || new Date()}
          mode="date"
          display="default"
          onChange={onToDateChange}
        />
      )}

      <Modal
        visible={showCountryPicker}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCountry}
              onValueChange={(itemValue) => {
                setSelectedCountry(itemValue);
                setShowCountryPicker(false); // Close the modal after selection
              }}
            >
              {countries.map((country) => (
                <Picker.Item
                  key={country.value}
                  label={country.label}
                  value={country.label}
                />
              ))}
            </Picker>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => setShowCountryPicker(false)}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showSeverityPicker}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedSeverity}
              onValueChange={(itemValue) => {
                setSelectedSeverity(itemValue);
                setShowSeverityPicker(false); // Close the modal after selection
              }}
            >
              {severities.map((severity) => (
                <Picker.Item
                  key={severity.value}
                  label={severity.label}
                  value={severity.label}
                />
              ))}
            </Picker>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => setShowSeverityPicker(false)}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.searchButton} onPress={performSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text style={styles.resultText}>{`Country: ${item.country}`}</Text>
            <Text
              style={styles.resultText}
            >{`Severity: ${item.severity}`}</Text>
            <Text style={styles.resultText}>{`Date: ${item.date}`}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // White background for cleanliness
    paddingHorizontal: 20,
  },
  headerWrapper: {
    backgroundColor: "#FF8A2D", // Bright orange for a welcoming header
    paddingTop: 50,
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000", // Subtle shadow for elevation
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    alignItems: "center",
  },
  title: {
    fontSize: 28, // Increased font size for better visibility
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  filterButton: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000", // Added shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  filterText: {
    color: "#FF8A2D",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
  },
  pickerContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  doneButton: {
    marginTop: 15,
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#FF8A2D",
    borderRadius: 10,
  },
  doneButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dateButton: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  dateText: {
    color: "#FF8A2D",
    fontWeight: "bold",
    fontSize: 16,
  },
  toText: {
    color: "#333333",
    fontWeight: "bold",
    marginHorizontal: 10,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "#FF8A2D",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  searchButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  resultItem: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  resultText: {
    color: "#333333",
    fontSize: 14,
    marginBottom: 5,
  },
});

export default SearchScreen;
