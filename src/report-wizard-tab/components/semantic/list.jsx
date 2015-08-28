import React from "react";

export default class List extends React.Component {
  render() {
    return (
      <div { ...this.props } className="ui list">
        { this.props.children }
      </div>
    );
  }
}
