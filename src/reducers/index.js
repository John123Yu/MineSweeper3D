import { combineReducers } from "redux";
import gameSettings from "./gameSettings";
import arrowReducer from "./arrowReducer";

const rootReducer = combineReducers({
  gameSettings,
  arrowDirection: arrowReducer
});

export default rootReducer;
