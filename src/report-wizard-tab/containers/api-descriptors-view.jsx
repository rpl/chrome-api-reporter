import React from "react";

import { connect } from "react-redux";

import APIDescriptor from "../components/api-descriptor.jsx";

@connect((state) => {
  return {
    apiDescriptors: state.apiDescriptors
  }
})
export default class APIDescriptorsView extends React.Component {
  render() {
    let { apiDescriptors } = this.props;

    return (
      <APIDescriptor apiDescriptor={ apiDescriptors }></APIDescriptor>
    );
  }
}
