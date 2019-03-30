// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  rotateRight,
  rotateLeft,
  rotateUp,
  rotateDown
} from "../actions/arrowActions";
import { rotateCube_ } from "../actions/cubeActions";

type Props = {};
type State = {};

class ArrowPad extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  upArrow() {
    let {
      arrowDirection: { rotateX, rotateY },
      rotateDown,
      rotateCube_,
      theCube
    } = this.props;
    rotateDown(rotateX, rotateY);
    rotateCube_(theCube, "up");
  }
  rightArrow() {
    let {
      arrowDirection: { rotateX, rotateY },
      rotateLeft,
      rotateCube_,
      theCube
    } = this.props;
    rotateLeft(rotateX, rotateY);
    rotateCube_(theCube, "right");
  }
  leftArrow() {
    let {
      arrowDirection: { rotateX, rotateY },
      rotateRight,
      rotateCube_,
      theCube
    } = this.props;
    rotateRight(rotateX, rotateY);
    rotateCube_(theCube, "left");
  }
  downArrow() {
    let {
      arrowDirection: { rotateX, rotateY },
      rotateUp,
      rotateCube_,
      theCube
    } = this.props;
    rotateUp(rotateX, rotateY);
    rotateCube_(theCube, "down");
  }

  render() {
    return (
      <div>
        <table className="arrowPad">
          <tbody>
            <tr>
              <td className="hidden" />
              <td onClick={this.upArrow.bind(this)}> ↑ </td>
              <td className="hidden" />
            </tr>
            <tr>
              <td onClick={this.leftArrow.bind(this)}> ← </td>
              <td className="arrowPadMid"> </td>
              <td onClick={this.rightArrow.bind(this)}> → </td>
            </tr>
            <tr>
              <td className="hidden" />
              <td onClick={this.downArrow.bind(this)}> ↓ </td>
              <td className="hidden" />
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps({ arrowDirection, gameSettings: { theCube } }) {
  return { arrowDirection, theCube };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { rotateRight, rotateLeft, rotateUp, rotateDown, rotateCube_ },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArrowPad);
