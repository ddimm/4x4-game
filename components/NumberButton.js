import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

export default function NumberButton({
  index,
  number,
  maxNumber,
  handleButtonPress,
}) {
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
