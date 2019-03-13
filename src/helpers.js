export function nestedArray(row, col) {
  let outerArray = [];
  for (let i = 0; i < row; i++) {
    let innerArray = [];
    for (let j = 0; j < col; j++) {
      innerArray.push("");
    }
    outerArray.push(innerArray);
  }
  return outerArray;
}

export function populateNestedArray(nestedArray, val, count) {
  let rows = nestedArray.length;
  let cols = nestedArray[0].length;
  while (count) {
    count--;
    let y = floorRand(rows);
    let x = floorRand(cols);
    !nestedArray[y][x] ? (nestedArray[y][x] = val) : count++;
  }
  return nestedArray;
}

export function valsAdjacentCounts(nestedArray, val) {
  for (let i = 0; i < nestedArray.length; i++) {
    for (let j = 0; j < nestedArray[0].length; j++) {
      if (nestedArray[i][j] === val) {
        nestedArray = addOneNestedArrAdjacents(nestedArray, i, j, val);
      }
    }
  }
  return nestedArray;
}

function floorRand(scale) {
  return Math.floor(Math.random() * scale);
}

function addOneNestedArrAdjacents(nestedArray, i, j, val) {
  let iList = [i - 1, i, i + 1];
  let jList = [j - 1, j, j + 1];
  for (let a of iList) {
    for (let b of jList) {
      if (nestedArray[a]) {
        if (nestedArray[a][b] !== undefined) {
          if (typeof nestedArray[a][b] != "number" && nestedArray[a][b] !== val)
            nestedArray[a][b] = 0;
          if (nestedArray[a][b] !== val) nestedArray[a][b]++;
        }
      }
    }
  }
  return nestedArray;
}
