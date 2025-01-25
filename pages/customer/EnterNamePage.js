import { SafeAreaView } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { View } from "react-native-web";

export default function EnterNamePage({ navigation }) {

    return(
        <SafeAreaView>
            <Text>Enter your name</Text>
            <TextInput
                style={styles.input}
            />
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Home')}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });