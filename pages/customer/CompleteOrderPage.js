import { SafeAreaView } from "react-native";
import { Text, Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { View, FlatList } from "react-native";

export default function CompleteOrderPage({ navigation }) {

    const [clubType, setClubType] = useState(0);
    const clubNames = ['Cactus\ud83c\udf35', 'Penguin\ud83d\udc27', 'Mango\ud83c\udf2d', 'Skibidi\ud83d\udc7d'];

    const [tableNumber, setTableNumber] = useState(0);
    const tableNumbers = Array.from({ length: 100 }, (_, i) => (i + 1).toString());

    const [peopleList, setPeopleList] = useState([
        { id: 1, name: 'John Doe', order: 'Pizza', status: 'Pending' },
        { id: 2, name: 'Jane Doe', order: 'Burger', status: 'Completed' },
        { id: 3, name: 'John Smith', order: 'Pasta', status: 'Pending' },
        { id: 4, name: 'Jane Smith', order: 'Salad', status: 'Completed' },
        { id: 5, name: 'John Johnson', order: 'Sandwich', status: 'Pending' },
    ]);

    useEffect(() => {
        setClubType(Math.floor(Math.random() * 4));
        setTableNumber(Math.floor(Math.random() * 100));
    }, []);

    return(
        <SafeAreaView style={styles.container}>

            <Text style={styles.title}>Welcome to {clubNames[clubType]} Club!</Text>
            <Text style={styles.tableNumber}>Table {tableNumbers[tableNumber]}</Text>

            <View style={styles.listContainer}>
                <FlatList
                    data={peopleList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Text style={styles.listItem}>{item.name}</Text>
                    )}
                />
            </View>

            <Button 
                style={styles.orderButton} 
                onPress={() => navigation.navigate('EnterNamePage')}
            >
                <Text style={styles.orderButtonText}>Order</Text>
            </Button>
            
            <Text style={styles.copyrightText}>Powered by Spot Inc.</Text>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 20,
    },
    title: {
        fontSize: '5vh',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
        width: '80%',
    },
    tableNumber: {
        fontSize: '4vh',
        textAlign: 'center',
        marginBottom: 30,
        fontWeight: 'bold',
    },
    listContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        width: '100%',
    },
    listItem: {
        fontSize: 18,
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '90vw',
        textAlign: 'left',
    },
    copyrightText: {
        color: '#24a45c',
        fontSize: '2vh',
        marginTop: 20,
        position: 'absolute',
        bottom: 0,
        marginBottom: 10,
    },
    orderButton: {
        backgroundColor: '#24a45c',
        borderRadius: 100,
        borderColor: 'black',
        borderWidth: 1,
        width: '50vw',
        height: '5vh',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    }, 
    orderButtonText: {
        color: 'white',
        fontSize: '2vh',
    }, 
});
