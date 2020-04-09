import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";
import {
  setGameType,
  updateBoard,
  setMoves,
  setWin,
  setHistory,
} from "../utils/actions";
function StartScreen({
  navigation,
  setGameType,
  board,
  updateBoard,
  setMoves,
  setHistory,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>
        Move the tiles into the correct order on the grid. Tiles may only be
        moved into the empty space.
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => {
            setWin(false);
            setHistory([]);
            setGameType(4);
            updateBoard([]);
            setMoves(0);

            navigation.navigate("GameScreen");
          }}
          title={"Start 4x4 Game"}
        ></Button>
      </View>
      <View>
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
    </View>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    setGameType: (num) => dispatch(setGameType(num)),
    updateBoard: (newBoard) => dispatch(updateBoard(newBoard)),
    setMoves: (moves) => dispatch(setMoves(moves)),
    setWin: (win) => dispatch(setWin(win)),
    setHistory: (history) => dispatch(setHistory(history)),
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
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  textStyle: {
    textAlign: "center",
    margin: 5,
    fontSize: 20,
  },
});
