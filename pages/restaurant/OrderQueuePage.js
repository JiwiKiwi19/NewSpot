import { useState, useEffect } from "react";
import { SafeAreaView, View, Text, FlatList, StyleSheet, ActivityIndicator, Dimensions, Platform, TouchableOpacity, Alert } from "react-native";
import { BREAKPOINTS, COLUMNS } from "./screenSize";
import { Ionicons } from "@expo/vector-icons";
import supabase from "../../config/supabaseClient";

export default function OrderQueuePage({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { width } = Dimensions.get("window");

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
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("orders").select("*").in("status", ["pending", "in-progress"]).order("created_at", { ascending: false });
      if (error) throw error;
  
      // Group and validate orders by table with user ID constraint
      const validGroupedOrders = validateOrdersForTables(data || []);
      setOrders(validGroupedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const validateOrdersForTables = (orders) => {
    const userIdToTableMap = new Map(); 
    const validOrders = {};
  
    for (const order of orders) {
      const { user_id, table_no } = order;
  
      // Skip if no user ID
      if (!user_id) continue;
  
      // Allow multiple orders for the same user at the same table
      if (userIdToTableMap.has(user_id) && userIdToTableMap.get(user_id) !== table_no) {
        console.error(`User ${user_id} is already assigned to Table ${userIdToTableMap.get(user_id)}. Skipping this order.`);
        continue;
      }
  
      userIdToTableMap.set(user_id, table_no);
  
      // Group orders by table number
      if (!validOrders[table_no]) {
        validOrders[table_no] = [];
      }
  
      // Append the order to the table's list
      validOrders[table_no].push(order);
    }
  
    return Object.entries(validOrders);
  };
  



  const markAsCompleted = async (orderId, table_no) => {
    try {
      const { error } = await supabase.from("orders").update({ status: "completed" }).eq("id", orderId);
      if (error) throw error;
  
      // Remove the completed order from the state and ensure it's cleared when a new order comes in
      setOrders((prevOrders) =>
        prevOrders.map(([table, tableOrders]) => {
          if (table === table_no) {
            // Remove completed order from the table's orders
            const updatedOrders = tableOrders.filter((order) => order.id !== orderId);
            return [table, updatedOrders];
          }
          return [table, tableOrders];
        })
      );
    } catch (error) {
      console.error("Error updating order", error.message);
    }
  };
  
  const cancelOrder = async (orderId, table_no) => {
    try {
      const { error } = await supabase.from("orders").update({ status: "cancelled" }).eq("id", orderId);
      if (error) throw error;
  
      // Remove the cancelled order from the state
      setOrders((prevOrders) =>
        prevOrders.map(([table, tableOrders]) => {
          if (table === table_no) {
            // Remove the cancelled order from the table's orders
            const updatedOrders = tableOrders.filter((order) => order.id !== orderId);
            
            // If the table has no more orders, remove the table entirely
            if (updatedOrders.length === 0) {
              return null; // This will filter out the table from the state
            }
            return [table, updatedOrders];
          }
          return [table, tableOrders];
        }).filter(Boolean) // Filter out null values (tables with no orders)
      );
    } catch (error) {
      console.error("Error canceling order", error.message);
    }
  };
  

const renderOrder = (table_no, tableOrders) => {
  const headerBackgroundColor = tableOrders.every((order) => order.quantity === 0) ? "#323e52" : "#459690";

  return (
    <View style={[styles.orderCard, { width: `${100 / numColumns}%` }]}>
      <View style={[styles.headerContainer, { backgroundColor: headerBackgroundColor }]}>
        <Text style={styles.tableText}>Table {table_no}</Text>
        <Text style={styles.dueText}>Due: {tableOrders[0]?.due_time}</Text>
      </View>
      <View style={styles.itemsContainer}>
        {tableOrders.map((order) => (
          <View key={order.id} style={styles.itemRow}>
            <Text style={styles.foodName}>
              {order.quantity} {order.food_name}
            </Text>
            <Text style={styles.foodDetails}>{order.details}</Text>
          </View>
        ))}
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.completeButton, { backgroundColor: "#24a45c" }]}
          onPress={() => markAsCompleted(tableOrders[0].id, table_no)}
        >
          <Ionicons name="checkmark" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.cancelButton, { backgroundColor: "#e74c3c" }]}
          onPress={() => cancelOrder(tableOrders[0].id, table_no)}
        >
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Orders Queue</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ transform: [{ rotate: "180deg" }] }}>
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
          renderItem={({ item }) => {
            const [table, tableOrders] = item;
            return renderOrder(table, tableOrders);
          }}
          keyExtractor={(item) => `table-${item[0]}`}
          numColumns={numColumns}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={numColumns > 1 ? { justifyContent: "flex-start", alignItems: "flex-start", gap: 16 } : null}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    overflow: "hidden",
    alignSelf: "flex-start",
    flexGrow: 1,
    maxWidth: Platform.OS === "web" ? "calc(100% / 4 - 10px)" : "100%",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  completeButton: {
    borderWidth: 2,
    borderColor: "#24a45c",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    marginHorizontal: 8,
    width: "35%",
  },
  cancelButton: {
    borderWidth: 2,
    borderColor: "#e74c3c",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    marginHorizontal: 8,
    width: "35%",
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
    alignSelf: "flex-start",
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
});