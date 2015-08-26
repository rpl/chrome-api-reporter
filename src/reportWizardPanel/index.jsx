import React from "react";

import { Provider, connect } from 'react-redux'

import { createAppStore } from "./stores";
import * as actions from "./actions";

window.STORE = createAppStore();
window.ACTIONS = actions;

@connect((state) => {
  return {
    appState: state,
    backgroundPage: state.backgroundPage
  }
}, (dispatch) => {
  return {
    onComponentDidMount: () => {
      dispatch(actions.connectBackgroundPage());
    }
  }
})
class HelloWorld extends React.Component {
  componentDidMount() {
    this.props.onComponentDidMount();
  }

  render() {
    let { connected, pending, errorMessage } = this.props.backgroundPage;

    return (<p>
      <h1>Hello World!</h1>
      <dl>
        <dt>connected</dt><dd>{ "" + connected }</dd>
        <dt>pending</dt><dd>{ "" + pending }</dd>
        <dt>errorMessage</dt><dd>{ errorMessage }</dd>
      </dl>
    </p>);
  }
}

class Application extends React.Component {
  render () {
    return (
      <Provider store={ window.STORE }>
        { () => <HelloWorld /> }
      </Provider>
    )
  }
}


React.render(<Application />, document.body);
