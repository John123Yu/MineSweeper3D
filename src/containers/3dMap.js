// @flow

import React, { Component } from "react";
import CubeCell from "./cubeCell";
import ArrowPad from "./arrowPad";
import {
  Arr3D,
  populateArr3D,
  AdjCounts3D,
  fillCubeFaces,
  cubeFaceColor
} from "../helpers/createCubeMap";
import { rotateCube } from "../helpers/copyCube";
import { truncate } from "fs";

type Props = {};
type State = {
  cubeSize: number,
  bombCount: number,
  bombVal: string,
  theCube: Array<Array<Array<number | string>>>,
  cellsClicked: number,
  clickedMap: Object
};

export default class Map3D extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let cubeSize = 3;
    let bombCount = 3;
    let bombVal = "☀";
    let theCube = fillCubeFaces(
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
    );
    this.state = {
      cubeSize,
      bombCount,
      bombVal,
      theCube,
      cellsClicked: 1
    };
    console.log(this.state.theCube);
  }

  arrowPad(arrow) {
    this.setState({ theCube: rotateCube(this.state.theCube, arrow) });
  }

  click(x, y, z) {
    let { theCube } = this.state;
    theCube[x][y][z].clicked = true;
    this.setState({ theCube: this.state.theCube });
  }

  render() {
    let {
      state: { theCube }
    } = this;
    return (
      <div>
        {theCube.map((yArr, x) => {
          return (
            <table
              key={x}
              className={"table table-bordered" + " no_display table" + x}
            >
              <tbody>
                {yArr.map((zArr, y) => {
                  return (
                    <tr key={y} className="cubeRow">
                      {zArr.map((val, z) => {
                        return (
                          <CubeCell
                            click={this.click.bind(this)}
                            key={z}
                            x={x}
                            y={y}
                            z={z}
                            val={val.val}
                            clicked={val.clicked}
                            color={val.color}
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
        <ArrowPad arrowPad={this.arrowPad.bind(this)} />
      </div>
    );
  }
}
