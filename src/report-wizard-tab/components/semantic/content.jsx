import React from "react";

export default class Content extends React.Component {
  render() {
    return (
      <div { ...this.props } className="content">
        { this.props.children }
      </div>
    );
  }
}
