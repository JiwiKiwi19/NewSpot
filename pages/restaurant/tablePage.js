import React, { useState, useEffect } from "react";
import {  SafeAreaView, View, Text, FlatList, StyleSheet, ActivityIndicator, Dimensions, Platform, TouchableOpacity  } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TablePage({ navigation }) {
    const COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#E91E63", "#9C27B0"];

    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching data (e.g., from an API)
        setTimeout(() => {
            setTables([
                { id: 1, name: "Table 1" },
                { id: 2, name: "Table 2" },
                { id: 3, name: "Table 3" },
            ]);
            setLoading(false); // Set loading to false after data is ready
        }, 2000);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Table Arrangement</Text>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#2196F3" style={styles.loader} />
            ) : (
                <View style={styles.tableContainer}>
                    {tables.map((table) => (
                        <Text key={table.id} style={styles.text}>{table.name}</Text>
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
        backgroundColor: "white",
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
    tableContainer: {
        flex: 1,
        position: "relative", // Allows absolute positioning for tables
    },
    table: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#000",
        position: "absolute", // Allows custom placement
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
