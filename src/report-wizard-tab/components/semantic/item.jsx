import React from "react";

export default class Item extends React.Component {
  render() {
    return (
      <div { ...this.props } className="item">
        { this.props.children }
      </div>
    );
  }
}
