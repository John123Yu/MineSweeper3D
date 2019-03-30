// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withToastManager } from "react-toast-notifications";

import CubeCell from "./cell";
import ArrowPad from "./arrowPad";
import ScoreBoard from "./scoreBoard";
import Cube from "./cube";
import { fillCubeFaces } from "../helpers/createCubeMap";

type Cell = {
  color: string,
  clicked: boolean,
  recursed: boolean,
  selected: boolean,
  flag: boolean
};
type GameSettings = {
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
type Props = {
  toastManager: Object,
  gameSettings: GameSettings
};
type State = {};

class Map3D extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let { toastManager, gameSettings, arrowDirection } = this.props;
    // console.log(this.props);
    // toastManager.add("You have won", {
    //   appearance: "success"
    // });
    // this.state = { ...gameSettings };
    // console.log(this.state);
  }
  incCellsClicked() {
    let { cellsClicked, safeCells, toastManager } = this.props;
    this.setState({
      cellsClicked: cellsClicked + 1
    });
    if (cellsClicked >= safeCells)
      toastManager.add("You have won", {
        appearance: "success"
      });
  }
  click(x, y, z) {
    let {
      gameSettings: { theCube },
      bombVal
    } = this.props;
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
    let {
      gameSettings: { theCube }
    } = this.props;
    let { clicked, flag } = theCube[x][y][z];
    if (!clicked) {
      theCube[x][y][z].flag = !flag;
      // this.setState({ theCube });
    }
  }
  mouseOver(x, y, z) {
    let {
      gameSettings: { theCube },
      bombVal
    } = this.props;
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
    let {
      gameSettings: { theCube }
    } = this.props;
    theCube = fillCubeFaces(theCube, () => () => false, "selected");
    this.setState({ theCube });
  }
  render() {
    let {
      props: {
        gameSettings: { theCube },
        bombsLeft,
        ratio,
        spaces
      }
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
          <Cube colors={colors} />
          <ArrowPad />
          <ScoreBoard bombsLeft={bombsLeft} ratio={ratio} spaces={spaces} />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ gameSettings, arrowDirection }) {
  return { gameSettings, arrowDirection };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withToastManager(Map3D));
