import { useState, useEffect } from "react";
import { SafeAreaView, View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";

export default function OrderQueuePage({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        // Mock data for testing purposes
        setOrders([
          {
            table: 1,
            dueText: "10 mins",
            items: [
              { name: "Burger", quantity: 2, details: ["No pickles", "Extra cheese"] },
              { name: "Fries", quantity: 1, details: ["Large"] },
            ],
          },
          {
            table: 2,
            dueText: "35 mins",
            items: [
              { name: "Schezhuan Lettuce Wr.", quantity: 1, details: ["Pepperoni", "Olives"] },
              { name: "Salad", quantity: 1, details: ["No dressing"] },
            ],
          },
          {
            table: 3,
            dueText: "5:35 PM",
            items: [
              { name: "Wopper Jr", quantity: 3, details: ["No pickles", "No mustard"] },
              { name: "Steak", quantity: 1, details: ["Medium rare", "sauce"] },
            ],
          },
        ]);
      }, 2000);
    };

    fetchData();
  }, []);

  const renderOrder = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.headerContainer}>
        <Text style={styles.tableText}>Table {item.table}</Text>
        <Text style={styles.dueText}>Due: {item.dueText}</Text>
      </View>
      <View style={styles.itemsContainer}>
        {item.items.map((food, index) => (
          <View key={index} style={styles.itemRow}>
            <Text style={styles.foodName}>{`x${food.quantity}`} {food.name}</Text>
            <Text style={styles.foodDetails}>
              {food.details.join(", ")}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Orders Queue</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : orders.length === 0 ? (
        <Text style={styles.noOrdersText}>No orders in queue</Text>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}
      <Text style={styles.copyrightText}>Powered by Spot Inc.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f8f9fa",
      padding: 16,
    },
    titleContainer: {
        backgroundColor: "#24a45c", 
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: 16,
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff", 
      },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
      color: "#343A40",
    },
    listContent: {
      paddingBottom: 16, 
    },
    orderCard: {
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 16,
      marginBottom: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    headerContainer: {
      backgroundColor: "gray", 
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    tableText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#fff", 
      marginBottom: 4,
    },
    dueText: {
      fontSize: 14,
      color: "#fff", 
    },
    itemsContainer: {
      borderTopWidth: 1,
      borderTopColor: "#dee2e6",
      paddingTop: 8,
    },
    itemRow: {
      marginBottom: 8,
      paddingHorizontal: 12,
    },
    foodName: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#212529",
      marginBottom: 4,
      flexShrink: 1,
    },
    quantityText:{
        fontSize: 14,
        fontWeight: "normal",
        color: "#6c757d",
    },
    foodDetails: {
      fontSize: 14,
      color: "#6c757d",
    },
    noOrdersText: {
      fontSize: 16,
      color: "#6c757d",
      textAlign: "center",
      marginTop: 16,
    },
    copyrightText: {
        color: '#24a45c',
        fontSize: '2vh',
        marginTop: 20,
        position: 'absolute',
        bottom: 0,
        marginBottom: 10,
        padding: 5,
    },
  });
  
