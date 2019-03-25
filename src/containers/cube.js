// @flow

import React, { Component } from "react";

type Props = { colors: Array<string>, rotateY: number, rotateX: number };
type State = {};

export default class Cube extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      colors: this.props.colors
    };
  }
  render() {
    let { colors } = this.state;
    let { rotateX, rotateY } = this.props;
    let rotateStyle = {
      transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`
    };
    return (
      <div className="wrap">
        <div className="cube" style={rotateStyle}>
          {colors.map((item, i) => {
            const divStyle = {
              transform: `translateZ(${i * 50}px)`,
              backgroundColor: item,
              opacity: 0.75
            };
            return <div key={i} style={divStyle} />;
          })}
        </div>
      </div>
    );
  }
}
