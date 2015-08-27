import React from "react";

import { connect } from "react-redux";

import { actions } from "../shared";

@connect((state) => {
  return {
    appState: state,
    backgroundPage: state.backgroundPage
  }
}, (dispatch) => {
  return {
    onComponentDidMount: () => {
      dispatch(actions.connectTabToBackgroundPage());
    }
  }
})
export default class DebugPanel extends React.Component {
  componentDidMount() {
    this.props.onComponentDidMount();
  }

  render() {
    let { connected, pending, errorMessage } = this.props.backgroundPage;

    return (<p>
      <h1>Debug Panel</h1>
      <dl>
        <dt>connected</dt><dd>{ "" + connected }</dd>
        <dt>pending</dt><dd>{ "" + pending }</dd>
        <dt>errorMessage</dt><dd>{ errorMessage }</dd>
      </dl>
    </p>);
  }
}
