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

export type Wildfire = {
  id: number;
  country: string;
  severity: string;
  date: string;
};

export const wildfires: Wildfire[] = [
  { id: 1, country: "United States", severity: "High (31-50)", date: "2024-12-01" },
  { id: 2, country: "Morocco", severity: "Moderate (11-30)", date: "2024-12-03" },
  { id: 3, country: "France", severity: "Low (0-10)", date: "2024-11-28" },
];

const SearchScreen = () => {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedSeverity, setSelectedSeverity] = useState("All Severities");
  const [countries, setCountries] = useState<{ label: string; value: string }[]>([]);
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
    const countryList = [
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
    const filtered = wildfires.filter((wildfire) => {
      const matchesCountry =
        selectedCountry === "All Countries" || wildfire.country === selectedCountry;
      const matchesSeverity =
        selectedSeverity === "All Severities" || wildfire.severity === selectedSeverity;
      const matchesDate =
        (!fromDate || new Date(wildfire.date) >= fromDate) &&
        (!toDate || new Date(wildfire.date) <= toDate);

      return matchesCountry && matchesSeverity && matchesDate;
    });
    setSearchResults(filtered);
  };

  const renderHeader = () => {
    return (
      <View>
        {/* Title at the top */}
        <View style={styles.header}>
          <Text style={styles.title}>Wildfire Search</Text>
        </View>

        {/* Filters */}
        <View style={styles.filterRow}>
          <TouchableOpacity style={styles.filterButton} onPress={() => setShowCountryPicker(true)}>
            <Text style={styles.filterText}>{selectedCountry}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterButton} onPress={() => setShowSeverityPicker(true)}>
            <Text style={styles.filterText}>{selectedSeverity}</Text>
          </TouchableOpacity>
        </View>

        {/* Dates */}
        <View style={styles.datePickerContainer}>
          <TouchableOpacity style={styles.dateButton} onPress={() => setShowFromDatePicker(true)}>
            <Text style={styles.dateText}>
              {fromDate ? fromDate.toDateString() : "Select From Date"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.toText}>to</Text>

          <TouchableOpacity style={styles.dateButton} onPress={() => setShowToDatePicker(true)}>
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
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text style={styles.resultText}>{`Country: ${item.country}`}</Text>
            <Text style={styles.resultText}>{`Severity: ${item.severity}`}</Text>
            <Text style={styles.resultText}>{`Date: ${item.date}`}</Text>
          </View>
        )}
      />

      <Modal visible={showCountryPicker} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCountry}
              onValueChange={(itemValue) => {
                setSelectedCountry(itemValue);
                setShowCountryPicker(false);
              }}
            >
              {countries.map((country) => (
                <Picker.Item key={country.value} label={country.label} value={country.label} />
              ))}
            </Picker>
            <TouchableOpacity style={styles.doneButton} onPress={() => setShowCountryPicker(false)}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showSeverityPicker} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedSeverity}
              onValueChange={(itemValue) => {
                setSelectedSeverity(itemValue);
                setShowSeverityPicker(false);
              }}
            >
              {severities.map((severity) => (
                <Picker.Item key={severity.value} label={severity.label} value={severity.label} />
              ))}
            </Picker>
            <TouchableOpacity style={styles.doneButton} onPress={() => setShowSeverityPicker(false)}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: { alignItems: "center", paddingVertical: 20, backgroundColor: "#FFFFFF" },
  title: { fontSize: 28, fontWeight: "bold", color: "#FF7A30" },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  filterButton: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  filterText: { fontSize: 14, fontWeight: "500", color: "#FF7A30" },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  dateButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E1E6EC",
    flex: 1,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  dateText: { fontSize: 14, fontWeight: "500", color: "#FF7A30" },
  toText: { fontSize: 14, fontWeight: "500", color: "#FF7A30", marginHorizontal: 10 },
  searchButton: {
    backgroundColor: "#FF7A30",
    paddingVertical: 15,
    borderRadius: 12,
    marginHorizontal: 20,
    alignItems: "center",
    marginTop: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  searchButtonText: { fontSize: 16, fontWeight: "600", color: "#FFFFFF" },
  resultItem: {
    backgroundColor: "#FFFFFF",
    marginVertical: 10,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E1E6EC",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginHorizontal: 20,
  },
  resultText: { fontSize: 14, fontWeight: "400", color: "#3C4858" },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  pickerContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  doneButton: {
    backgroundColor: "#FF7A30",
    marginTop: 10,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 12,
  },
  doneButtonText: { fontSize: 16, fontWeight: "600", color: "#FFFFFF" },
});

export default SearchScreen;
