import { useState, useEffect } from "react";
import { SafeAreaView, View, Text, FlatList, StyleSheet, ActivityIndicator, Dimensions, Platform, TouchableOpacity } from "react-native";
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
      const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (error) {
        throw error;
      }
      console.log("Fetched Orders:", data); // Test Purpose
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const markAsCompleted = async (orderId) => {
    try {
      const { error } = await supabase.from("orders").update({ status: "completed" }).eq("id", orderId);
      if (error) throw error;
      fetchOrders();
    } catch (error) {
      console.error("Error updating order", error.message);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const { error } = await supabase.from("orders").update({ status: "cancelled" }).eq("id", orderId);
      if (error) throw error;
      fetchOrders();
    } catch (error) {
      console.error("Error canceling order", error.message);
    }
  };

  const renderOrder = ({ item: order }) => {
    console.log("Rendering Order:", order); // Test Purpose
    const headerBackgroundColor = order.quantity === 0 ? "#323e52" : "#459690";

    return (
      <View style={[styles.orderCard, { width: `${100 / numColumns}%` }]}>
        <View style={[styles.headerContainer, { backgroundColor: headerBackgroundColor }]}>
          <Text style={styles.tableText}>Table {order.table}</Text>
          <Text style={styles.dueText}>Due: {order.due_text}</Text>
        </View>
        <View style={styles.itemsContainer}>
          {/* Render food details directly from the columns */}
          <View key={order.id} style={styles.itemRow}>
            <Text style={styles.foodName}>
              {order.quantity} {order.food_name}
            </Text>
            <Text style={styles.foodDetails}>{order.details}</Text>
          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.completeButton, { backgroundColor: "#24a45c" }]} onPress={() => markAsCompleted(order.id)}>
            <Ionicons name="checkmark" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cancelButton, { backgroundColor: "#e74c3c" }]} onPress={() => cancelOrder(order.id)}>
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
          renderItem={renderOrder}
          keyExtractor={(order) => order.id}
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

