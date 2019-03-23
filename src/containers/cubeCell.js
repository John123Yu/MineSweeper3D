import React, { Component } from "react";
import classNames from "classnames";

type Props = {
  x: number,
  y: number,
  z: number,
  val: string | number,
  click: method,
  clicked: boolean,
  color: string
};
type State = {};
// let endMineSweeperGame = false;
export default class CubeCell extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  handleContextMenu(e: SyntheticMouseEvent<>) {}
  handleClick() {
    let { x, y, z, click } = this.props;
    click(x, y, z);
  }
  handleMouseOver() {
    let { x, y, z, mouseOver } = this.props;
    mouseOver(x, y, z);
  }
  render() {
    let { x, y, z, val, clicked, color, selected, mouseOut } = this.props;
    let cellsClass = classNames({
      cell: true,
      clicked,
      bomb: this.props.val === "☀",
      selected
    });
    const colorStyle = {
      backgroundColor: color
    };
    return (
      <td
        id={`${x}_${y}_${z}`}
        className={cellsClass}
        onClick={this.handleClick.bind(this)}
        onMouseOver={this.handleMouseOver.bind(this)}
        onMouseLeave={mouseOut}
        style={colorStyle}
      >
        {clicked ? val : ""}
      </td>
    );
  }
}
