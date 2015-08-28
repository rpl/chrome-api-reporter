import React from "react";

export default class Grid extends React.Component {
  render() {
    let className = `ui grid ${this.props.className || "" }`;

    return (
      <div { ...this.props } className={ className }>
        { this.props.children }
      </div>
    );
  }
}
