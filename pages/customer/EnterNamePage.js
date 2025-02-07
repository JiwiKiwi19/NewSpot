import { SafeAreaView } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { View } from "react-native-web";
import { LogBox } from "react-native";

// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
// LogBox.ignoreAllLogs(true);//Ignore all log notifications

export default function EnterNamePage({ navigation }) {

    const [clubType, setClubType] = useState(0);
    const clubNames = ['Cactus🌵', 'Penguin🐧', 'Mango🥭', 'Skibidi👽'];

    const [tableNumber, setTableNumber] = useState(0);
    const tableNumbers = Array.from({ length: 100 }, (_, i) => (i + 1).toString());

    const [nickname, setNickname] = useState('');

    const onScreenLoad = () => {
        setClubType(Math.floor(Math.random() * 4));
        setTableNumber(Math.floor(Math.random() * 100));
    }

    useEffect(() => {
        onScreenLoad();
    }, []);

    return(
        <SafeAreaView style={styles.container}>

            <Text style={styles.title}>Welcome to {clubNames[clubType]} Club!</Text>
            <Text style={styles.tableNumber}>You're on Table {tableNumbers[tableNumber]}</Text>

            <View style={styles.confirmationContainer}>

                <Text style={styles.nicknameChooseText}>Choose Your Nickname: </Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Nickname" 
                    placeholderTextColor={'gray'} 
                    onChangeText={setNickname} 
                    value={nickname}
                />

                <Button 
                    style={[styles.confirmButton, nickname.length >= 3 ? styles.confirmButtonActive : {}]} 
                    onPress={() => nickname.length >= 3 ? navigation.navigate('CompleteOrderPage') : {}}
                >
                    <Text style={styles.confirmButtonText}>Confirm</Text>
                </Button>

            </View>
            
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
        marginBottom: 30,
        width: '80%',
    },
    tableNumber: {
        fontSize: '3vh',
        textAlign: 'center',
        marginBottom: 30,
    },
    confirmationContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    nicknameChooseText: {
        fontSize: '2vh',
        color: 'gray',
        marginBottom: 20,
    },
    input: {
        height: '5vh',
        width: '75vw',
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'lightgray',
        borderColor: 'black',
        borderRadius: 5,
    },
    confirmButton: {
        backgroundColor: 'gray',
        borderRadius: 100,
        borderColor: 'black',
        borderWidth: 1,
        width: '50vw',
        height: '5vh',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        transition: '0.3s ease-in-out',
    },
    confirmButtonActive: {
        backgroundColor: '#24a45c',
    },
    confirmButtonText: {
        color: 'white',
        fontSize: '2vh',
    },
    copyrightText: {
        color: '#24a45c',
        fontSize: '2vh',
        marginTop: 20,
        position: 'absolute',
        bottom: 0,
        marginBottom: 10,
    },
});
