import { ROTATE_CUBE } from "../actions/cubeActions.js";
import { UPDATE_CUBE } from "../actions/cubeActions.js";
import { INCR_CLICKED } from "../actions/scoreActions.js";
import { DECR_BOMBS } from "../actions/scoreActions.js";

import {
  Arr3D,
  populateArr3D,
  AdjCounts3D,
  fillCubeFaces,
  cubeFaceColor
} from "../helpers/createCubeMap";

let initialState = new function() {
  this.cubeSize = 4;
  this.bombCount = 8;
  this.bombVal = "☀";
  this.safeCells =
    this.cubeSize * this.cubeSize * this.cubeSize - this.bombCount;
  this.theCube = customeCube(
    this.cubeSize,
    this.bombVal,
    this.bombCount,
    cubeFaceColor
  );
  this.cellsClicked = 1;
  this.ratio = 0;
  this.bombsLeft = this.bombCount;
}();

export default function(state = initialState, action) {
  switch (action.type) {
    case ROTATE_CUBE:
      return { ...state, theCube: action.payload };
    case INCR_CLICKED:
      return {
        ...state,
        cellsClicked: action.payload
      };
    case UPDATE_CUBE:
      return {
        ...state,
        theCube: action.payload
      }
    case DECR_BOMBS:
      return {
        ...state,
        theCube: action.payload
    }
    default:
      return state;
  }
}

function customeCube(cubeSize, bombVal, bombCount, cubeFaceColor) {
  return fillCubeFaces(
    fillCubeFaces(
      fillCubeFaces(
        fillCubeFaces(
          fillCubeFaces(
            AdjCounts3D(
              populateArr3D(
                Arr3D(cubeSize, cubeSize, cubeSize),
                bombVal,
                bombCount
              ),
              bombVal
            ),
            cubeFaceColor,
            "color"
          ),
          () => () => false,
          "clicked"
        ),
        () => () => false,
        "recursed"
      ),
      () => () => false,
      "selected"
    ),
    () => () => false,
    "flag"
  );
}
