import { GAME_SETTINGS } from "../actions/mapActions.js";
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
  this.ratio = 0;
  this.safeCells =
    this.cubeSize * this.cubeSize * this.cubeSize - this.bombCount;
  this.theCube = customeCube(
    this.cubeSize,
    this.bombVal,
    this.bombCount,
    cubeFaceColor
  );
  this.cellsClicked = 1;
  this.bombsLeft = this.bombCount;
  this.rotateX = 0;
  this.rotateY = 0;
}();

export default function(state = initialState, action) {
  if (action.payload) return action.payload;
  return state;
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
