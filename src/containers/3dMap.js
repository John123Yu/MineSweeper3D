// @flow

import React, { Component } from "react";
import CubeCell from "./cubeCell";
import ArrowPad from "./arrowPad";
import {
  Arr3D,
  populateArr3D,
  AdjCounts3D,
  cubeFaceColor
} from "../helpers/cubeMap";
import { rotateCube } from "../helpers/copyCube";
import { truncate } from "fs";

type Props = {};
type State = {
  cubeSize: number,
  bombCount: number,
  bombVal: string,
  theCube: Array<Array<Array<number | string>>>,
  cellsClicked: number,
  clickedMap: Object,
  faceColor: method
};

export default class Map3D extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let cubeSize = 3;
    let bombCount = 3;
    let bombVal = "☀";
    let theCube = AdjCounts3D(
      populateArr3D(Arr3D(cubeSize, cubeSize, cubeSize), bombVal, bombCount),
      bombVal
    );
    console.log("here", theCube);
    this.state = {
      cubeSize,
      bombCount,
      bombVal,
      theCube,
      cellsClicked: 1
    };
    console.log("HERE");
    console.log(this.state.theCube);
  }

  arrowPad(arrow) {
    this.setState({ theCube: rotateCube(this.state.theCube, arrow) });
  }

  click(x, y, z) {
    // if (this.state.theCube[x][y][z] < 10) {
    //   this.state.theCube[x][y][z] += 10;
    //   this.setState({ theCube: this.state.theCube });
    // } else if (this.state.theCube[x][y][z] === "☀") {
    //   this.state.theCube[x][y][z] += "☀";
    //   this.setState({ theCube: this.state.theCube });
    // }
  }

  render() {
    let {
      state: { theCube }
    } = this;
    return (
      <div>
        {theCube.map((yArr, x) => {
          // const faceColorStyle = {
          //   backgroundColor: faceColor(theCube[0])
          // };
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
