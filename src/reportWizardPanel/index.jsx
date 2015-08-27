import React from "react";

import { Provider, connect } from 'react-redux'

import { createAppStore } from "./stores";

import Application from "./containers/application.jsx"

let store = createAppStore();

React.render(<Application store={ store }/>, document.body);

// NOTE: exported for console inspector / interaction
import * as actions from "./actions";
window.STORE = store;
window.ACTIONS = actions;
