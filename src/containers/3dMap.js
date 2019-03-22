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
import classNames from "classnames";

type Props = {};
type State = {
  cubeSize: number,
  bombCount: number,
  bombVal: string,
  theCube: Array<Array<Array<number | string>>>,
  cellsClicked: number,
  clickedMap: Object,
  zoom: number
};

export default class Map3D extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let cubeSize = 5;
    let bombCount = 30;
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
      cellsClicked: 1,
      zoom: 0
    };
    console.log(this.state.theCube);
  }

  arrowPad(arrow) {
    if (arrow) {
      this.setState({ theCube: rotateCube(this.state.theCube, arrow) });
    } else {
      let zoom = this.state.zoom;
      zoom++;
      if (zoom >= this.state.cubeSize) zoom = 0;
      this.setState({ zoom: zoom });
    }
  }

  click(x, y, z) {
    let { theCube } = this.state;
    theCube[x][y][z].clicked = true;
    this.setState({ theCube: this.state.theCube });
  }

  render() {
    let {
      state: { theCube, zoom }
    } = this;
    console.log(zoom);
    return (
      <div>
        {theCube.map((yArr, x) => {
          let tableClass = classNames({
            no_display: x !== zoom
          });
          return (
            <table key={x} className={tableClass}>
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
