import React from "react";

import { Provider } from 'react-redux';

import PageGrid from "./page-grid.jsx";

export default class Application extends React.Component {
  render () {
    return (
      <Provider store={ this.props.store }>
        { () => <PageGrid></PageGrid> }
      </Provider>
    )
  }
}
