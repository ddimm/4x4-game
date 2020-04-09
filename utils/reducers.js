import {
  UPDATE_BOARD,
  SET_GAME_TYPE,
  SET_WIN,
  SET_MOVES,
  UNDO,
} from "./actions";

const initState = {
  gameType: 4,
  board: [],
  win: false,
  moves: 0,
  history: [],
};

function reducer(state = initState, action) {
  switch (action.type) {
    case UPDATE_BOARD:
      return {
        gameType: state.gameType,
        board: action.newBoard,
        win: state.win,
        moves: state.moves,
        history: [...state.history, state.board],
      };
    case SET_GAME_TYPE:
      return {
        gameType: action.length,
        board: state.board,
        win: state.win,
        moves: state.moves,
        history: state.history,
      };
    case SET_WIN:
      return {
        gameType: state.gameType,
        board: state.board,
        win: action.win,
        moves: state.moves,
        history: state.history,
      };
    case SET_MOVES:
      return {
        gameType: state.gameType,
        board: state.board,
        win: state.win,
        moves: action.moves,
        history: state.history,
      };
    case UNDO: {
      const oldState = state.history[state.history.length - 1];
      return {
        gameType: state.gameType,
        board: oldState,
        win: state.win ? !state.win : state.win,
        moves: state.moves - 1,
        history: state.history.slice(0, state.history.length - 1),
      };
    }
  }
  return state;
}
export default reducer;
