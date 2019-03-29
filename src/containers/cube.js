// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
type Props = { colors: Array<string>, rotateY: number, rotateX: number };
type State = {};

class Cube extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    let {
      arrowDirection: { rotateX, rotateY },
      colors
    } = this.props;
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

function mapStateToProps({ arrowDirection }) {
  return { arrowDirection };
}

export default connect(
  mapStateToProps,
  null
)(Cube);
