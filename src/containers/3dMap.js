// @flow

import React, { Component } from "react";
import CubeCell from "./cubeCell";
import ArrowPad from "./arrowPad";
import ScoreBoard from "./scoreBoard";
import {
  Arr3D,
  populateArr3D,
  AdjCounts3D,
  fillCubeFaces,
  cubeFaceColor
} from "../helpers/createCubeMap";
import { rotateCube } from "../helpers/copyCube";
// import classNames from "classnames";

type Props = {};
type State = {
  cubeSize: number,
  bombCount: number,
  bombVal: string,
  theCube: Array<Array<Array<number | string>>>,
  cellsClicked: number,
  clickedMap: Object,
  bombsLeft: number,
  ratio: number
};

export default class Map3D extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let cubeSize = 4;
    let bombCount = 8;
    let bombsLeft = bombCount;
    let bombVal = "☀";
    let ratio = 0;
    let theCube = fillCubeFaces(
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
    );
    this.state = {
      cubeSize,
      bombCount,
      bombVal,
      theCube,
      cellsClicked: 1,
      bombsLeft,
      ratio
    };
    console.log(this.state.theCube);
  }
  arrowPad(arrow) {
    this.setState({ theCube: rotateCube(this.state.theCube, arrow) });
  }
  click(x, y, z) {
    let { theCube, bombVal } = this.state;
    theCube[x][y][z].clicked = true;
    this.setState({ theCube });

    if (theCube[x][y][z].val === bombVal)
      this.setState({ bombsLeft: --this.state.bombsLeft });
    //recursion
    if (theCube[x][y][z].val === "" && !theCube[x][y][z].recursed) {
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
                  this.click(i, j, k);
                }
              }
            }
          }
        }
      }
    }
  }
  mouseOver(x, y, z) {
    let { theCube, bombVal } = this.state;
    let iList = [x - 1, x, x + 1];
    let jList = [y - 1, y, y + 1];
    let kList = [z - 1, z, z + 1];
    let bombs = 0;
    let cells = 0;
    let num = theCube[x][y][z].val;
    //TODO: implement queue with mouseOut for performance
    for (let i of iList) {
      if (theCube[i]) {
        for (let j of jList) {
          if (theCube[i][j]) {
            for (let k of kList) {
              if (theCube[i][j][k]) {
                if (!theCube[i][j][k].clicked) cells++;
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
      ? (ratio = (num - bombs) / cells)
      : (ratio = "n/a");
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
      state: { theCube, bombsLeft, ratio }
    } = this;
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
                              key={z}
                              x={x}
                              y={y}
                              z={z}
                              val={val.val}
                              clicked={val.clicked}
                              color={val.color}
                              selected={val.selected}
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
        <div>
          <ArrowPad arrowPad={this.arrowPad.bind(this)} />
          <ScoreBoard bombsLeft={bombsLeft} ratio={ratio} />
        </div>
      </div>
    );
  }
}
