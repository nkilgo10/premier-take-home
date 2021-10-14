import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from "react-native";
import Input from "../components/Input";
import distanceApi from "../api/DistanceAPI";

const HomeScreen = () => {
  //useState calls for each input field to manage user input
  const [userStartingAddress, setUserStartingAddress] = useState();
  const [destinationOne, setDestinationOne] = useState();
  const [destinationTwo, setDestinationTwo] = useState();
  const [destinationThree, setDestinationThree] = useState();
  const [destinationFour, setDestinationFour] = useState();
  const [destinationFive, setDestinationFive] = useState();
  const [destinationSix, setDestinationSix] = useState();

  //pressed is used to conditionally render the list of addresses & distanceState holds the API response
  const [pressed, setPressed] = useState(false);
  const [distanceState, setDistanceState] = useState([]);

  return (
    <SafeAreaView style={styles.conatiner}>
      <View style={styles.startAddressContainer}>
        <Text>Enter Your Starting/End Destination: </Text>
        <Input
          value={userStartingAddress}
          onChangeValue={setUserStartingAddress}
        />
      </View>
      <View style={styles.endAddressContainer}>
        <Text>Enter 1st Destination: </Text>
        <Input value={destinationOne} onChangeValue={setDestinationOne} />
        <Text>Enter 2nd Destination: </Text>
        <Input value={destinationTwo} onChangeValue={setDestinationTwo} />
        <Text>Enter 3rd Destination: </Text>
        <Input value={destinationThree} onChangeValue={setDestinationThree} />
        <Text>Enter 4th Destination: </Text>
        <Input value={destinationFour} onChangeValue={setDestinationFour} />
        <Text>Enter 5th Destination: </Text>
        <Input value={destinationFive} onChangeValue={setDestinationFive} />
        <Text>Enter 6th Destination: </Text>
        <Input value={destinationSix} onChangeValue={setDestinationSix} />
        <TouchableOpacity
          style={styles.calcButtonContainer}
          onPress={async () => {
            let distance = await distanceApi(
              userStartingAddress,
              destinationOne,
              destinationTwo,
              destinationThree,
              destinationFour,
              destinationFive,
              destinationSix
            );
            setDistanceState(distance);
            setPressed(true);
          }}
        >
          <Text style={styles.calculateButton}>Calculate Route Times</Text>
        </TouchableOpacity>

        {pressed &&
          distanceState.map((dis, index) => (
            <SafeAreaView key={dis.key} style={styles.listContainer}>
              <View style={styles.listNumberContainer}>
                <Text style={styles.listNumber}>{index + 1}.)</Text>
              </View>
              <Text style={styles.nameText}>{dis.name} - </Text>
              <Text style={styles.distanceText}>{dis.text}</Text>
            </SafeAreaView>
          ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    height: "100%",
  },
  calculateButton: {
    fontSize: 16,
    fontFamily:
      Platform.OS === "android" ? "Roboto" : "Baskerville-SemiBoldItalic",
    color: "red",
  },
  calcButtonContainer: {
    margin: 10,
    alignItems: "center",
    paddingRight: 10,
  },
  distanceText: {
    fontSize: 8,
    fontStyle: "italic",
    flexShrink: 1,
  },
  endAddressContainer: {
    height: "10%",
    marginLeft: 10,
  },
  listContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  listNumberContainer: {
    marginRight: 5,
  },
  listNumber: {
    fontFamily:
      Platform.OS === "android" ? "Roboto" : "Baskerville-SemiBoldItalic",
    fontSize: 14,
    color: "green",
  },
  nameText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  startAddressContainer: {
    height: "10%",
    marginLeft: 10,
  },
});
export default HomeScreen;
