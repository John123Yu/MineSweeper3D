import { rotateCube } from "../helpers/copyCube";

export const ROTATE_CUBE = "ROTATE_CUBE";
export const UPDATE_CUBE = "UPDATE_CUBE";

export function rotateCube_(theCube, direction) {
  let newCube = rotateCube(theCube, direction);
  return {
    type: ROTATE_CUBE,
    payload: newCube
  };
}
export function updateCube(theCube) {
  return {
    type: ROTATE_CUBE,
    payload: theCube
  };
}

