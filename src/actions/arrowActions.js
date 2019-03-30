export const ROTATE_RIGHT = "ROTATE_RIGHT";
export const ROTATE_LEFT = "ROTATE_LEFT";
export const ROTATE_UP = "ROTATE_UP";
export const ROTATE_DOWN = "ROTATE_DOWN";

export function rotateRight(rotateX, rotateY) {
  if ([90, -90, 270, -270].indexOf(rotateX) === -1) {
    rotateY -= 90;
    if ([-360, 360].includes(rotateY)) rotateY = 0;
  }
  return {
    type: ROTATE_RIGHT,
    payload: { rotateX, rotateY }
  };
}
export function rotateLeft(rotateX, rotateY) {
  if ([90, -90, 270, -270].indexOf(rotateX) === -1) {
    rotateY += 90;
    if ([-360, 360].includes(rotateY)) rotateY = 0;
  }
  return {
    type: ROTATE_LEFT,
    payload: { rotateX, rotateY }
  };
}
export function rotateUp(rotateX, rotateY) {
  if ([90, -90, 270, -270].indexOf(rotateY) === -1) {
    rotateX -= 90;
    if ([-360, 360].includes(rotateX)) rotateX = 0;
  }
  return {
    type: ROTATE_DOWN,
    payload: { rotateX, rotateY }
  };
}
export function rotateDown(rotateX, rotateY) {
  if ([90, -90, 270, -270].indexOf(rotateY) === -1) {
    rotateX += 90;
    if ([-360, 360].includes(rotateX)) rotateX = 0;
  }
  return {
    type: ROTATE_UP,
    payload: { rotateX, rotateY }
  };
}
