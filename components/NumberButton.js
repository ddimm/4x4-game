import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NumberButton({ number, maxNumber, handleButtonPress }) {
  if (number !== maxNumber * maxNumber) {
    return (
      <TouchableOpacity
        onPress={() => handleButtonPress()}
        style={styles.numberContainer}
      >
        <Text style={styles.numberFont}>{number}</Text>
      </TouchableOpacity>
    );
  } else {
    return <View style={styles.emptyContainer}></View>;
  }
}

const styles = StyleSheet.create({
  numberContainer: {
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    height: 84,
  },
  emptyContainer: {
    height: 84,
  },
  numberFont: {
    fontStyle: "normal",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
