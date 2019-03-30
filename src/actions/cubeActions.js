import { rotateCube } from "../helpers/copyCube";
export const ROTATE_CUBE = "ROTATE_CUBE";
// export function initSettings(
export function rotateCube_(theCube, direction) {
  let newCube = rotateCube(theCube, direction);
  return {
    type: ROTATE_CUBE,
    payload: newCube
  };
}
