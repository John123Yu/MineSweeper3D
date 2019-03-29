import React, { Component } from "react";
import classNames from "classnames";

type Props = {
  x: number,
  y: number,
  z: number,
  val: string | number,
  click: method,
  clicked: boolean,
  color: string,
  flag: boolean,
  contextMenu: method
};
type State = {};
// let endMineSweeperGame = false;
export default class CubeCell extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  handleContextMenu(e: SyntheticMouseEvent<>) {
    e.preventDefault();
    let { clicked, contextMenu, x, y, z } = this.props;
    if (!clicked) contextMenu(x, y, z);
  }
  handleClick() {
    let { x, y, z, click } = this.props;
    click(x, y, z);
  }
  handleMouseOver() {
    let { x, y, z, mouseOver } = this.props;
    mouseOver(x, y, z);
  }
  render() {
    let { x, y, z, val, clicked, color, selected, mouseOut, flag } = this.props;
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
        onContextMenu={this.handleContextMenu.bind(this)}
        onMouseOver={this.handleMouseOver.bind(this)}
        onMouseLeave={mouseOut}
        style={colorStyle}
      >
        {clicked ? val : ""}
        {flag ? "⚑" : ""}
      </td>
    );
  }
}
