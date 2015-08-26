import React from "react";

import { createAppStore } from "./stores";
import * as actions from "./actions";

window.STORE = createAppStore();
window.ACTIONS = actions;

class HelloWorld extends React.Component {
  render() {
    return <h1>Hello World!</h1>;
  }
}

React.render(<HelloWorld />, document.body);
