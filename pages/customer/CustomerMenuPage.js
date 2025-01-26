import { SafeAreaView } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { View } from "react-native-web";
import { LogBox } from "react-native";

export default function CustomerMenuPage({ navigation }) {
    
    const [menuTitles, setMenuTitles] = useState(['Appetizers', 'Entrees', 'Desserts', 'Drinks']);
    const [menu, setMenu] = useState([
        [   
            {name: 'Soup', price: 5.00, description: 'Delicious soup'},
            {name: 'Salad', price: 6.00, description: 'Fresh salad'},
            {name: 'Bread', price: 3.00, description: 'Crusty bread'},
            {name: 'Spring Rolls', price: 4.00, description: 'Crispy rolls'}
        ], // appetizers
        [
            {name: 'Pizza', price: 5.00, description: 'Delicious Italian Bois'},
            {name: 'Steak', price: 20.00, description: 'Juicy grilled steak cooked to perfection'},
            {name: 'Pasta', price: 12.50, description: 'Classic Italian pasta with rich tomato sauce'},
            {name: 'Chicken Wings', price: 8.00, description: 'Bombass Chicken Wings, yum yum'}
        ], // entrees
        [
            {name: 'Chocolate Cake', price: 6.50, description: 'Rich and moist chocolate cake with creamy frosting'},
            {name: 'Ice Cream', price: 4.00, description: 'Smooth and creamy ice cream with various flavors'},
            {name: 'Cheesecake', price: 7.00, description: 'Classic New York-style cheesecake with a graham cracker crust'},
            {name: 'Fruit Tart', price: 5.50, description: 'Delightful tart filled with fresh seasonal fruits'}
        ], // desserts
        [
            {name: 'Coffee', price: 3.00, description: 'Freshly brewed coffee with a rich aroma'},
            {name: 'Lemonade', price: 4.50, description: 'Refreshing homemade lemonade with a tangy twist'},
            {name: 'Smoothie', price: 6.00, description: 'A healthy blend of fresh fruits and yogurt'},
            {name: 'Iced Tea', price: 3.50, description: 'Chilled iced tea with a hint of lemon'}
        ], // drinks
    ]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Menu</Text>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
});