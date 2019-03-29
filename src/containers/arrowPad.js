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

type Props = {};
type State = {};

class ArrowPad extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  upArrow() {
    let {
      arrowDirection: { rotateX, rotateY },
      rotateDown
    } = this.props;
    rotateDown(rotateX, rotateY);
  }
  rightArrow() {
    let {
      arrowDirection: { rotateX, rotateY },
      rotateLeft
    } = this.props;
    rotateLeft(rotateX, rotateY);
  }
  leftArrow() {
    let {
      arrowDirection: { rotateX, rotateY },
      rotateRight
    } = this.props;
    rotateRight(rotateX, rotateY);
  }
  downArrow() {
    let {
      arrowDirection: { rotateX, rotateY },
      rotateUp
    } = this.props;
    rotateUp(rotateX, rotateY);
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

function mapStateToProps({ arrowDirection }) {
  return { arrowDirection };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { rotateRight, rotateLeft, rotateUp, rotateDown },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArrowPad);
