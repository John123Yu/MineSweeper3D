export const INCR_CLICKED = "INCR_CLICKED";
export const DECR_BOMBS = "DECR_BOMBS";
export const UPDATE_RATIO = "UPDATE_RATIO";
export const UPDATE_SPACES = "UPDATE_SPACES";

export function incrCellsClicked(cellsClicked) {
  return {
    type: INCR_CLICKED,
    payload: cellsClicked
  };
}
export function decrBombsLeft(bombsLeft) {
	return {
		type: DECR_BOMBS,
		payload: bombsLeft
	}
}
export function updateRatio(ratio) {
  return {
    type: UPDATE_RATIO,
    payload: ratio
  };
}
export function updateSpaces(spaces) {
  return {
    type: UPDATE_SPACES,
    payload: spaces
  };
}
