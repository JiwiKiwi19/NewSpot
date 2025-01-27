import { useState, useEffect } from "react";
import { SafeAreaView, View, Text, FlatList, StyleSheet, ActivityIndicator, Dimensions, Platform } from "react-native";

export default function OrderQueuePage({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { width } = Dimensions.get("window");

  // Determine the number of columns based on platform and screen width
  const numColumns = Platform.OS === "web" ? (width > 1200 ? 4 : width > 800 ? 3 : 2) : (width > 600 ? 2 : 1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOrders([
          // Sample data
          {
            table: 1,
            dueText: "10 mins",
            items: [{ name: "Burger", quantity: 2, details: ["No pickles", "Extra cheese"] }],
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
                x{food.quantity} {food.name}
              </Text>
              <Text style={styles.foodDetails}>{food.details.join(", ")}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Orders Queue</Text>
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
          columnWrapperStyle={numColumns > 1 ? styles.columnWrapperStyle : null} // Conditionally apply
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
  listContent: {
    paddingBottom: 16,
    paddingHorizontal: 8,
  },
  columnWrapperStyle: {
    justifyContent: "space-between",
    marginVertical: 8,
  },
  orderCard: {
    backgroundColor: "#fff",
    padding: 1,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  headerContainer: {
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
    minHeight: 200,
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
