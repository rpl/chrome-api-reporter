import React from "react";

import { connect } from "react-redux";

@connect((state) => {
  return {
    apiDescriptors: state.apiDescriptors
  }
})
export default class APIDescriptorsView extends React.Component {
  render() {
    let { apiDescriptors } = this.props;

    return (
      <pre>
        { JSON.stringify(apiDescriptors, null, 2) }
      </pre>
    );
  }
}
