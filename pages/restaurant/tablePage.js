import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function TablePage({ navigation }) {
  const COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#E91E63", "#9C27B0"];
  const GREY_COLOR = "#B0B0B0";
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    // Simulate fetching table data
    setTimeout(() => {
      setTables([
        { id: 1, name: "Table 1", people: 4 },
        { id: 2, name: "Table 2", people: 6 },
        { id: 3, name: "Table 3", people: 8 },
        { id: 4, name: "Table 4", people: 6 },
        { id: 5, name: "Table 5", people: 6 },
        { id: 6, name: "Table 6", people: 15 },
        { id: 7, name: "Table 7", people: 8 },
        { id: 8, name: "Table 8", people: 12 },
        { id: 9, name: "Table 9", people: 6 },
      ]);
      setLoading(false); 
    }, 2000); 
  }, []);

  const tablePositions = {
    1: { top: height * 0.05, left: width * 0.05, width: width * 0.15, height: height * 0.1 },
    2: { top: height * 0.05, left: width * 0.3, width: width * 0.2, height: height * 0.08 },
    3: { top: height * 0.05, left: width * 0.6, width: width * 0.15, height: height * 0.1 },
    4: { top: height * 0.2, left: width * 0.6, width: width * 0.15, height: height * 0.1 },
    5: { top: height * 0.2, left: width * 0.05, width: width * 0.2, height: height * 0.08 },
    6: { top: height * 0.2, left: width * 0.3, width: width * 0.15, height: height * 0.25 },
    7: { top: height * 0.5, left: width * 0.3, width: width * 0.2, height: height * 0.08 },
    8: { top: height * 0.2, left: width * 0.8, width: width * 0.15, height: height * 0.15 },
    9: { top: height * 0.5, left: width * 0.05, width: width * 0.25, height: height * 0.08 },
  };

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * COLORS.length);
    return COLORS[randomIndex];
  };

  const getTableColor = (people) => {
    return people > 0 ? getRandomColor(): GREY_COLOR;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Table Arrangement</Text>
      </View>

      {/* Conditional Loading Indicator or Table Layout */}
      {loading ? (
        <ActivityIndicator size="large" color="#2196F3" style={styles.loader} />
      ) : (
        <View style={styles.tableContainer}>
          {tables.map((table) => (
            <View
              key={table.id}
              style={[
                styles.table,
                {
                  backgroundColor: getTableColor(table.people),
                  ...tablePositions[table.id],
                },
              ]}
            >
              <Text style={styles.text}>{`#${table.id}`}</Text>
              <Text style={styles.text}>{`${table.people} people`}</Text>
            </View>
          ))}
        </View>
      )}

      <Text style={styles.footerText}>Powered by Spot Inc.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#333",
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  loader: {
    marginTop: height * 0.4,
  },
  tableContainer: {
    flex: 1,
    position: "relative",
  },
  table: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    position: "absolute",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "center",
    fontSize: 14,
    color: "#24a45c",
    marginTop: 16,
  },
});
