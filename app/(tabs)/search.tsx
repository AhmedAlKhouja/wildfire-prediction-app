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
      </View>

      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Make the default background white
    paddingHorizontal: 20,
  },
  headerWrapper: {
    backgroundColor: "#ff8a2d", // Orange background for the top section
    paddingTop: 50,
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  header: {
    alignItems: "center",
    backgroundColor: "#ff8a2d",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  filterText: {
    color: "#FF8A2D",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  pickerContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  doneButton: {
    marginTop: 10,
    alignItems: "center",
  },
  doneButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF8A2D",
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
  },
  dateText: {
    color: "#FF8A2D",
    fontWeight: "bold",
  },
  toText: {
    color: "#333333",
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  searchButton: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  searchButtonText: {
    color: "#FF8A2D",
    fontWeight: "bold",
  },
  resultItem: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  resultText: {
    color: "#333333",
  },
});

export default SearchScreen;
