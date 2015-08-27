import React from "react";

export default class Column extends React.Component {
  render() {
    let props = this.props;
    let className = `${props.className || "" } column`;
    return (
      <div { ...props } className={ className }></div>
    );
  }
}
