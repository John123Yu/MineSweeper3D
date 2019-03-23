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
    let { bombsLeft, ratio } = this.props;
    return (
      <div>
        <table className="arrowPad">
          <tbody>
            <tr>
              <td> Bombs Left: </td>
              <td> Ratio: </td>
            </tr>
            <tr>
              <td>{bombsLeft}</td>
              <td>{ratio}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
