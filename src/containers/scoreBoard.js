// @flow

import React, { Component } from "react";

type Props = {
  bombsLeft: number,
  ratio: float
};
type State = {};

export default class ScoreBoard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    let { bombsLeft, ratio, spaces } = this.props;
    return (
      <div>
        <table className="arrowPad">
          <tbody>
            <tr>
              <td> Bombs Left: </td>
              <td> Spaces: </td>
              <td> Fraction: </td>
              <td> Ratio: </td>
            </tr>
            <tr>
              <td>{bombsLeft}</td>
              <td> {spaces} </td>
              <td>{ratio}</td>
              <td> {1 / ratio}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
