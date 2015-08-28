import React from "react";

export default class Icon extends React.Component {
  render() {
    return (
      <i { ...this.props } className={ "icon " + this.props.iconId }></i>
    );
  }
}
