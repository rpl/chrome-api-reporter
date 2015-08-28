import React from "react";

import { connect } from "react-redux";

import APIDescriptor from "../components/api-descriptor.jsx";

import { Grid, Column, Content } from "../components/semantic";

@connect((state) => {
  return {
    apiDescriptors: state.apiDescriptors
  }
})
export default class APIDescriptorsView extends React.Component {
  render() {
    let { apiDescriptors } = this.props;

    let content = Object.keys(apiDescriptors).map((key) => {
      let value = apiDescriptors[key];

      return (
        <Column className="four wide">
          <Content>
            <h2>{ key }</h2>
            <APIDescriptor apiDescriptor={ value }></APIDescriptor>
          </Content>
        </Column>
      );
    });

    return <Grid className="stackable">{ content }</Grid>;
  }
}
