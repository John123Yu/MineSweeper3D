// @flow

import React, { Component } from "react";
import CubeCell from "./cell";
import ArrowPad from "./arrowPad";
import ScoreBoard from "./scoreBoard";
import Cube from "./cube";
import {
  Arr3D,
  populateArr3D,
  AdjCounts3D,
  fillCubeFaces,
  cubeFaceColor
} from "../helpers/createCubeMap";
import { rotateCube } from "../helpers/copyCube";

type Cell = {
  color: string,
  clicked: boolean,
  recursed: boolean,
  selected: boolean,
  flag: boolean
};
type Props = {};
type State = {
  cubeSize: number,
  bombCount: number,
  bombVal: string,
  theCube: Array<Array<Array<Cell>>>,
  cellsClicked: number,
  clickedMap: Object,
  bombsLeft: number,
  ratio: number,
  spaces: number
};

export default class Map3D extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let cubeSize = 4;
    let bombCount = 8;
    let bombsLeft = bombCount;
    let bombVal = "☀";
    let ratio = 0;
    let safeCells = cubeSize * cubeSize * cubeSize - bombCount;
    let theCube = fillCubeFaces(
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
    this.state = {
      cubeSize,
      bombCount,
      bombVal,
      theCube,
      cellsClicked: 1,
      bombsLeft,
      ratio,
      rotateX: 0,
      rotateY: 0,
      safeCells
    };
  }
  incCellsClicked() {
    let { cellsClicked, safeCells } = this.state;
    this.setState({
      cellsClicked: cellsClicked + 1
    });
    if (cellsClicked >= safeCells) alert("☀☀☀ You have won! ☀☀☀");
    console.log(cellsClicked);
  }
  arrowPad(arrow) {
    let { theCube, rotateX, rotateY } = this.state;
    this.setState({ theCube: rotateCube(theCube, arrow) });
    switch (arrow) {
      case "up":
        if ([90, -90, 270, -270].indexOf(rotateY) === -1) {
          rotateX -= 90;
          if ([-360, 360].includes(rotateX)) rotateX = 0;
          this.setState({ rotateX });
        }
        break;
      case "down":
        if ([90, -90, 270, -270].indexOf(rotateY) === -1) {
          if ([-360, 360].includes(rotateX)) rotateX = 0;
          rotateX += 90;
          this.setState({ rotateX });
        }
        break;
      case "right":
        if ([90, -90, 270, -270].indexOf(rotateX) === -1) {
          if ([-360, 360].includes(rotateY)) rotateY = 0;
          rotateY -= 90;
          this.setState({ rotateY });
        }
        break;
      case "left":
        if ([90, -90, 270, -270].indexOf(rotateX) === -1) {
          if ([-360, 360].includes(rotateY)) rotateY = 0;
          rotateY += 90;
          this.setState({ rotateY });
        }
        break;
      default:
        break;
    }
  }
  click(x, y, z) {
    let { theCube, bombVal } = this.state;
    let { flag, val, recursed, clicked } = theCube[x][y][z];
    if (!flag) {
      if (val !== bombVal && !clicked) this.incCellsClicked();
      theCube[x][y][z].clicked = true;
      this.setState({ theCube });
      if (val === bombVal) this.setState({ bombsLeft: --this.state.bombsLeft });
      if (val === "" && !recursed) {
        theCube[x][y][z].recursed = true;
        this.setState({ theCube });
        let iList = [x - 1, x, x + 1];
        let jList = [y - 1, y, y + 1];
        let kList = [z - 1, z, z + 1];
        for (let i of iList) {
          if (theCube[i]) {
            for (let j of jList) {
              if (theCube[i][j]) {
                for (let k of kList) {
                  if (theCube[i][j][k] && !theCube[i][j][k].clicked) {
                    setImmediate(() => {
                      if (theCube[i][j][k].val !== bombVal)
                        this.incCellsClicked();
                    });
                    this.click(i, j, k);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  contextMenu(x, y, z) {
    let { theCube } = this.state;
    let { clicked, flag } = theCube[x][y][z];
    if (!clicked) {
      theCube[x][y][z].flag = !flag;
      this.setState({ theCube });
    }
  }
  mouseOver(x, y, z) {
    let { theCube, bombVal } = this.state;
    let iList = [x - 1, x, x + 1];
    let jList = [y - 1, y, y + 1];
    let kList = [z - 1, z, z + 1];
    let bombs = 0;
    let spaces = 0;
    let num = theCube[x][y][z].val;
    //TODO: implement queue with mouseOut for performance
    for (let i of iList) {
      if (theCube[i]) {
        for (let j of jList) {
          if (theCube[i][j]) {
            for (let k of kList) {
              if (theCube[i][j][k]) {
                if (!theCube[i][j][k].clicked) spaces++;
                if (
                  theCube[i][j][k].clicked &&
                  theCube[i][j][k].val === bombVal
                )
                  bombs++;
                if (!(i === x && j === y && k === z))
                  theCube[i][j][k].selected = true;
              }
            }
          }
        }
      }
    }
    let ratio: Float32Array;
    theCube[x][y][z].clicked
      ? (ratio = (num - bombs) / spaces)
      : (ratio = "n/a");
    this.setState({ spaces });
    this.setState({ ratio });
    this.setState({ theCube });
  }
  mouseOut() {
    let { theCube } = this.state;
    theCube = fillCubeFaces(theCube, () => () => false, "selected");
    this.setState({ theCube });
  }
  render() {
    let {
      state: { theCube, bombsLeft, ratio, spaces, rotateX, rotateY }
    } = this;
    let colors = [];
    for (let i = theCube.length - 1; i >= 0; i--) {
      colors.push(theCube[i][0][0].color);
    }
    return (
      <div>
        <div className="row mapRow">
          {theCube.map((yArr, x) => {
            return (
              <table key={x} className={" table" + x}>
                <tbody>
                  {yArr.map((zArr, y) => {
                    return (
                      <tr key={y} className="cubeRow">
                        {zArr.map((val, z) => {
                          return (
                            <CubeCell
                              mouseOver={this.mouseOver.bind(this)}
                              mouseOut={this.mouseOut.bind(this)}
                              click={this.click.bind(this)}
                              contextMenu={this.contextMenu.bind(this)}
                              key={z}
                              x={x}
                              y={y}
                              z={z}
                              val={val.val}
                              clicked={val.clicked}
                              color={val.color}
                              selected={val.selected}
                              flag={val.flag}
                            />
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            );
          })}
        </div>
        <div className="menuDiv">
          <Cube colors={colors} rotateX={rotateX} rotateY={rotateY} />
          <ArrowPad arrowPad={this.arrowPad.bind(this)} />
          <ScoreBoard bombsLeft={bombsLeft} ratio={ratio} spaces={spaces} />
        </div>
      </div>
    );
  }
}
