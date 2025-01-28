import { useState, useEffect } from "react";
import { SafeAreaView, View, Text, FlatList, StyleSheet, ActivityIndicator, Dimensions, Platform, TouchableOpacity } from "react-native";
import { BREAKPOINTS, COLUMNS } from "./config";
import { Ionicons } from "@expo/vector-icons";

export default function OrderQueuePage({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { width } = Dimensions.get("window");

  // Determine the number of columns based on platform and screen width
  const numColumns =
    Platform.OS === "web"
      ? width > BREAKPOINTS.webLarge
        ? COLUMNS.webLarge
        : width > BREAKPOINTS.webMedium
        ? COLUMNS.webMedium
        : COLUMNS.webSmall
      : width > BREAKPOINTS.mobile
      ? COLUMNS.tablet
      : COLUMNS.mobile;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOrders([
          // Mock data
          {
            table: 1,
            dueText: "10 mins",
            items: [ 
              { name: "Burger", quantity: 2, details: ["No pickles", "Extra cheese"] },
              { name: "Fries", quantity: 1, details: [] },
              { name: "Fries", quantity: 1, details: [] },
              { name: "Fries", quantity: 1, details: [] },
              { name: "Fries", quantity: 1, details: [] },
              { name: "Fries", quantity: 1, details: [] },
              { name: "Fries", quantity: 1, details: [] },
              { name: "Fries", quantity: 1, details: [] },
              { name: "Fries", quantity: 1, details: [] },
            ],
          },
          {
            table: 2,
            dueText: "35 mins",
            items: [{ name: "Pizza", quantity: 1, details: ["Extra cheese"] }],
          },
          {
            table: 3,
            dueText: "5:35 PM",
            items: [],
          },
          {
            table: 4,
            dueText: "5:35 PM",
            items: [],
          },
          {
            table: 4,
            dueText: "5:35 PM",
            items: [],
          },
          {
            table: 4,
            dueText: "5:35 PM",
            items: [],
          },
          {
            table: 4,
            dueText: "5:35 PM",
            items: [],
          },
          {
            table: 4,
            dueText: "5:35 PM",
            items: [],
          },
          
        ]);
      }, 2000);
    };

    fetchData();
  }, []);

  const renderOrder = ({ item }) => {
    const headerBackgroundColor = item.items.length === 0 ? "#323e52" : "#24a45c";
  
    return (
      <View style={[styles.orderCard, { width: `${100 / numColumns - 5}%` }]}>
        <View style={[styles.headerContainer, { backgroundColor: headerBackgroundColor }]}>
          <Text style={styles.tableText}>Table {item.table}</Text>
          <Text style={styles.dueText}>Due: {item.dueText}</Text>
        </View>
        <View style={styles.itemsContainer}> 
            {item.items.map((food, index) => (
              <View key={index} style={styles.itemRow}>
                <Text style={styles.foodName}>
                  {food.quantity}  {food.name}
                </Text>
                <Text style={styles.foodDetails}>{food.details.join(", ")}</Text>
              </View>
            ))}
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.completeButton} onPress={() => markAsCompleted(item.id)}>
            <Text style={styles.completeButtonText}>Mark Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => cancelOrder(item.id)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Orders Queue</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ transform: [{ rotate: '180deg' }] }}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loadingIndicator} />
      ) : orders.length === 0 ? (
        <Text style={styles.noOrdersText}>No orders in queue</Text>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={numColumns > 1 ? styles.columnWrapperStyle : null} 
          showsVerticalScrollIndicator={false}
        />
      )}
      <Text style={styles.footerText}>Powered by Spot Inc.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 16,
  },
  titleContainer: {
    backgroundColor: "black",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 16,
  },
  backButton:{
    padding: 8,
    marginLeft: "auto",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  listContent: {
    paddingBottom: 16,
    paddingHorizontal: 8,
  },
  columnWrapperStyle: {
    justifyContent: "flex-start",
    alignItems: "stretch",
    gap: 16,
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    flex: 1,
    minWidth: 250,
    maxWidth: 250,
    overflow: 'hidden', 
    alignSelf: "flex-start",
    maxWidth: Platform.OS === "web" ? "calc(100% / 4 - 10px)" : "100%",
  },
  completeButton: {
    borderWidth: 2,
    borderColor: "#24a45c", 
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    marginHorizontal: 8,
  },
  cancelButton: {
    borderWidth: 2,
    borderColor: "#e74c3c", 
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    marginHorizontal: 8,
  },
  completeButtonText: {
    color: "#24a45c", 
    fontSize: 14,
    fontWeight: "bold",
  },
  cancelButtonText: {
    color: "#e74c3c", 
    fontSize: 14,
    fontWeight: "bold",
  },
  headerContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
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
    flex: 1,
  },
  itemRow: {
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212529",
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
  footerText: {
    textAlign: "center",
    fontSize: 14,
    color: "#24a45c",
    marginTop: 16,
  },
  loadingIndicator: {
    marginTop: 30,
  },
});
