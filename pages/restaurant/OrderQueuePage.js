import { useState, useEffect } from "react";
import { SafeAreaView, View, Text, FlatList, StyleSheet, ActivityIndicator, Dimensions, Button } from "react-native";

export default function OrderQueuePage({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const addTable = (newTable) => {
    setOrders(prevOrders => [...prevOrders, newTable]);
  };

  const { width } = Dimensions.get("window"); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOrders([
        //   {
        //     table: 1,
        //     dueText: "10 mins",
        //     items: [
        //       { name: "Burger", quantity: 2, details: ["No pickles", "Extra cheese"] },
        //       { name: "Fries", quantity: 1, details: ["Large"] },
        //     ],
        //   },
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
            <Text style={styles.foodDetails}>{food.details.join(", ")}</Text>
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

      
      <View style={styles.buttonContainer}>
        <Button
          title="Add New Table"
          onPress={() =>
            addTable({
              table: orders.length + 1,
              dueText: "10 mins",
              items: [{ name: "New Dish", quantity: 1, details: ["Extra Spicy"] }],
            })
          }
        />
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
          numColumns={4}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapperStyle}
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
    paddingHorizontal: 16,
  },
  titleContainer: {
    backgroundColor: "#24a45c",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonContainer: {
    width: '100%', 
  },
  listContent: {
    paddingBottom: 16,
  },
  columnWrapperStyle: {
    justifyContent: "space-between",
  },
  orderCard: {
    backgroundColor: "#fff",
    padding: 1,
    marginVertical: 12,
    marginHorizontal: 10,
    width: (Dimensions.get("window").width - 48 - 40) / 4,
    justifyContent: "space-between",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  headerContainer: {
    backgroundColor: "#41606e",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "100%",
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
    width: "100%",
    minHeight: 250,
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
  quantityText: {
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
    color: "#24a45c",
    fontSize: 14,
    marginTop: 20,
    position: "absolute",
    bottom: 0,
    marginBottom: 10,
    padding: 5,
  },
});
