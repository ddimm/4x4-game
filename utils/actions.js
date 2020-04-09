export const UPDATE_TILES = "UPDATE_TILES";
export const SET_GAME_TYPE = "SET_TILE_LENGTH";
export const UPDATE_BOARD = "UPDATE_BOARD";
export const SET_WIN = "SET_WIN";
export const SET_MOVES = "SET_MOVES";
export const UNDO = "UNDO";
export const SET_HISTORY = "SET_HISTORY";

export function updateBoard(newBoard) {
  return { type: UPDATE_BOARD, newBoard: newBoard };
}

export function setGameType(length) {
  return { type: SET_GAME_TYPE, length };
}

export function setWin(win) {
  return { type: SET_WIN, win: win };
}

export function setMoves(moves) {
  return { type: SET_MOVES, moves };
}

export function undo() {
  return { type: UNDO };
}

export function setHistory(history) {
  return { type: SET_HISTORY, history };
}
