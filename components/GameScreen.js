import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import NumberButton from "./NumberButton";
import { updateBoard, setWin } from "../utils/actions";

const _ = require("lodash");

function GameScreen({ gameType, updateBoard, board, win, setWin }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (board.length <= 0) {
      let startingBoard = _.range(1, gameType * gameType + 1);
      updateBoard(_.shuffle(startingBoard));
      setReady(true);
    } else {
      setReady(true);
    }
  }, []);

  async function checkWin() {
    if (board.length > 0) {
      for (let i = 1; i < board.length; i++) {
        if (board[i] < board[i - 1]) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
  async function handleButtonPress(number, index) {
    let mappedBoard = _.chunk(board, gameType);
    let [row, col] = [Math.floor(index / gameType), index % gameType];
    let emptyTargetValue = gameType * gameType;

    if (row - 1 >= 0 && mappedBoard[row - 1][col] === emptyTargetValue) {
      mappedBoard[row][col] = emptyTargetValue;
      mappedBoard[row - 1][col] = number;
      updateBoard(_.flattenDeep(mappedBoard));
    } else if (
      row + 1 < gameType &&
      mappedBoard[row + 1][col] === emptyTargetValue
    ) {
      mappedBoard[row][col] = emptyTargetValue;
      mappedBoard[row + 1][col] = number;
      updateBoard(_.flattenDeep(mappedBoard));
    } else if (col - 1 >= 0 && mappedBoard[row][col - 1] === emptyTargetValue) {
      mappedBoard[row][col] = emptyTargetValue;
      mappedBoard[row][col - 1] = number;
      updateBoard(_.flattenDeep(mappedBoard));
    } else if (
      col + 1 < gameType &&
      mappedBoard[row][col + 1] === emptyTargetValue
    ) {
      mappedBoard[row][col] = emptyTargetValue;
      mappedBoard[row][col + 1] = number;
      updateBoard(_.flattenDeep(mappedBoard));
    }
    checkWin().then((isWon) => {
      if (isWon) {
        console.log("won");
        setWin(isWon);
      }
    });
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
                  index={index}
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
});
function mapStateToProps(state) {
  return {
    gameType: state.gameType,
    board: state.board,
    win: state.win,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateBoard: (newBoard) => dispatch(updateBoard(newBoard)),
    setWin: (win) => dispatch(setWin(win)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
