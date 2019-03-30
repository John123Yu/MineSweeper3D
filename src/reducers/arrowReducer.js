import { ROTATE_RIGHT } from "../actions/arrowActions.js";
import { ROTATE_LEFT } from "../actions/arrowActions.js";
import { ROTATE_UP } from "../actions/arrowActions.js";
import { ROTATE_DOWN } from "../actions/arrowActions.js";

let initialState = {
  rotateX: 0,
  rotateY: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ROTATE_UP:
      return action.payload;
    case ROTATE_DOWN:
      return action.payload;
    case ROTATE_LEFT:
      return action.payload;
    case ROTATE_RIGHT:
      return action.payload;
  }
  return state;
}
