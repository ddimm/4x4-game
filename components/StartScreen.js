import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";
import { setGameType, updateBoard } from "../utils/actions";
function StartScreen({ navigation, setGameType, board, updateBoard }) {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          setGameType(4);
          updateBoard([]);
          navigation.navigate("GameScreen");
        }}
        title={"Start 4x4 Game"}
      ></Button>

      {board.length > 0 ? (
        <Button
          title={"Continue Game"}
          onPress={() => {
            navigation.navigate("GameScreen");
          }}
        ></Button>
      ) : (
        <></>
      )}
    </View>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    setGameType: (num) => dispatch(setGameType(num)),
    updateBoard: (newBoard) => dispatch(updateBoard(newBoard)),
  };
}
function mapStateToProps(state) {
  return {
    board: state.board,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
