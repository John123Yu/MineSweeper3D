// @flow
export function Arr3D(x: number, y: number, z: number, val = "") {
  let firArr: Array<Array<Array<number | string>>> = [];
  for (let i = 0; i < x; i++) {
    let secArr: Array<Array<number | string>> = [];
    for (let j = 0; j < y; j++) {
      let thirArr: Array<number | string> = [];
      for (let k = 0; k < z; k++) {
        thirArr.push({ val });
      }
      secArr.push(thirArr);
    }
    firArr.push(secArr);
  }
  return firArr;
}
export function populateArr3D(
  Arr3D: Array<Array<Array<number | string>>>,
  val: string | number,
  count: number
) {
  let Xlen = Arr3D.length;
  let Ylen = Arr3D[0].length;
  let Zlen = Arr3D[0][0].length;
  while (count) {
    let x = floorRand(Xlen);
    let y = floorRand(Ylen);
    let z = floorRand(Zlen);
    if (!Arr3D[x][y][z].val) {
      Arr3D[x][y][z].val = val;
      count--;
    }
  }
  return Arr3D;
}
export function AdjCounts3D(
  Arr3D: Array<Array<Array<number | string>>>,
  val: string | number
) {
  let cubeLen = Arr3D.length;
  for (let i = 0; i < cubeLen; i++) {
    for (let j = 0; j < cubeLen; j++) {
      for (let k = 0; k < cubeLen; k++) {
        if (Arr3D[i][j][k].val === val) {
          Arr3D = incrAdjArr3D(Arr3D, val, i, j, k);
        }
      }
    }
  }
  return Arr3D;
}
function incrAdjArr3D(
  Arr3D: Array<Array<Array<number | string>>>,
  val: string | number,
  i: number,
  j: number,
  k: number
) {
  let iList = [i - 1, i, i + 1];
  let jList = [j - 1, j, j + 1];
  let kList = [k - 1, k, k + 1];
  for (let a of iList) {
    if (Arr3D[a] !== undefined) {
      for (let b of jList) {
        if (Arr3D[a][b] !== undefined) {
          for (let c of kList) {
            if (Arr3D[a][b][c] !== undefined && Arr3D[a][b][c].val !== val) {
              if (typeof Arr3D[a][b][c].val !== "number") {
                Arr3D[a][b][c].val = 0;
              }
              Arr3D[a][b][c].val++;
            }
          }
        }
      }
    }
  }
  return Arr3D;
}
export function fillCubeFaces(
  Arr3D: Array<Array<Array<number | string>>>,
  filler, //memoized function
  name: string
) {
  let x = Arr3D.length;
  let y = Arr3D[0].length;
  let z = Arr3D[0][0].length;
  let faceFiller = filler();

  for (let i = 0; i < x; i++) {
    let value = faceFiller(i);
    for (let j = 0; j < y; j++) {
      for (let k = 0; k < z; k++) {
        Arr3D[i][j][k][name] = value;
      }
    }
  }
  return Arr3D;
}
function floorRand(scale: number) {
  return Math.floor(Math.random() * scale);
}
function readCubeFace(face) {
  let vals = 0;
  for (let i = 0; i < face.length; i++) {
    for (let j = 0; j < face.length; j++) {
      if (typeof face[i][j] !== "number") vals += 0.00001;
      else {
        if (face[i][j] >= 10) {
          vals += face[i][j];
          vals -= 10;
        } else {
          vals += face[i][j];
        }
      }
    }
  }
  return vals;
}
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function cubeFaceColor() {
  let faceColors = {};
  return function(val, func) {
    // val = readCubeFace(val);
    if (func) val = func(val);
    if (faceColors[val]) return faceColors[val];
    var digit = val.toString()[val.toString().length - 1];
    faceColors[val] = getRandomColor();
    return faceColors[val];
  };
}
