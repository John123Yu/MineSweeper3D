export const INCR_CLICKED = "INCR_CLICKED";
export const DECR_BOMBS = "DECR_BOMBS";

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