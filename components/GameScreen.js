import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import NumberButton from "./NumberButton";
import {
  updateBoard,
  setWin,
  setMoves,
  undo,
  setHistory,
  setGameType,
} from "../utils/actions";

const _ = require("lodash");

function GameScreen({
  gameType,
  updateBoard,
  board,
  setWin,
  moves,
  setMoves,
  undo,
  win,
  navigation,
  setHistory,
  setGameType,
}) {
  const [ready, setReady] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (board.length <= 0) {
      let startingBoard = _.range(1, gameType * gameType + 1);
      //   let startingBoard = [
      //     1,
      //     2,
      //     3,
      //     4,
      //     5,
      //     6,
      //     7,
      //     8,
      //     9,
      //     10,
      //     11,
      //     12,
      //     13,
      //     14,
      //     16,
      //     15,
      //   ]; //testing board
      updateBoard(_.shuffle(startingBoard));
      //   updateBoard(startingBoard);
      setWin(false);
      setGameOver(false);
      setReady(true);
    } else {
      setReady(true);
      checkWin();
    }
  }, [board]);

  function checkWin() {
    const isWin = () => {
      if (board.length > 0) {
        for (let i = 1; i < board.length; i++) {
          if (board[i] < board[i - 1]) {
            return false;
          }
        }
        return true;
      }
      return false;
    };
    if (isWin()) {
      setWin(true);
      setGameOver(true);
      alert("You Won!");
    }
  }
  function handleButtonPress(number, index) {
    let mappedBoard = _.chunk(board, gameType);
    let [row, col] = [Math.floor(index / gameType), index % gameType];
    let emptyTargetValue = gameType * gameType;

    if (row - 1 >= 0 && mappedBoard[row - 1][col] === emptyTargetValue) {
      mappedBoard[row][col] = emptyTargetValue;
      mappedBoard[row - 1][col] = number;
      updateBoard(_.flattenDeep(mappedBoard));
      setMoves(moves + 1);
    } else if (
      row + 1 < gameType &&
      mappedBoard[row + 1][col] === emptyTargetValue
    ) {
      mappedBoard[row][col] = emptyTargetValue;
      mappedBoard[row + 1][col] = number;
      updateBoard(_.flattenDeep(mappedBoard));
      setMoves(moves + 1);
    } else if (col - 1 >= 0 && mappedBoard[row][col - 1] === emptyTargetValue) {
      mappedBoard[row][col] = emptyTargetValue;
      mappedBoard[row][col - 1] = number;
      updateBoard(_.flattenDeep(mappedBoard));
      setMoves(moves + 1);
    } else if (
      col + 1 < gameType &&
      mappedBoard[row][col + 1] === emptyTargetValue
    ) {
      mappedBoard[row][col] = emptyTargetValue;
      mappedBoard[row][col + 1] = number;
      updateBoard(_.flattenDeep(mappedBoard));
      setMoves(moves + 1);
    }
  }

  if (ready) {
    return (
      <View style={styles.container}>
        <FlatList
          data={board}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.numContainer}>
                <NumberButton
                  number={item}
                  maxNumber={gameType}
                  handleButtonPress={() => {
                    handleButtonPress(item, index);
                  }}
                />
              </View>
            );
          }}
          numColumns={gameType}
          keyExtractor={(item, index) => {
            return String(index);
          }}
        />
        {gameOver ? (
          <View style={styles.gameOver}>
            <Text style={{ fontSize: 20, padding: 10 }}>
              Good job, you won!
            </Text>
            <Button
              title={"new game"}
              onPress={() => {
                setReady(false);
                setGameOver(false);
                setWin(false);
                setHistory([]);
                setGameType(4);
                updateBoard([]);
                setMoves(0);

                navigation.navigate("GameScreen");
              }}
            ></Button>
          </View>
        ) : (
          <></>
        )}
        <View style={styles.controlContainer}>
          <Text>Moves: {moves}</Text>
          <Button disabled={moves <= 0} title="undo" onPress={undo}></Button>
        </View>
      </View>
    );
  } else {
    return <View></View>;
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    paddingTop: 30,
  },
  numContainer: {
    flex: 1,
    flexDirection: "column",
    margin: 1,
  },
  controlContainer: {
    flex: 1,
    paddingTop: 40,
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  gameOver: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
function mapStateToProps(state) {
  return {
    gameType: state.gameType,
    board: state.board,
    moves: state.moves,
    win: state.win,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateBoard: (newBoard) => dispatch(updateBoard(newBoard)),
    setWin: (win) => dispatch(setWin(win)),
    setMoves: (moves) => dispatch(setMoves(moves)),
    undo: () => dispatch(undo()),
    setHistory: (history) => dispatch(setHistory(history)),
    setGameType: (type) => dispatch(setGameType(type)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
