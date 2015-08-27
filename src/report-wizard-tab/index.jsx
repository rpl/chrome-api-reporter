import React from "react";

import { Provider, connect } from 'react-redux'

import { createAppStore } from "./shared";

import Application from "./containers/application.jsx"

let store = createAppStore();

React.render(<Application store={ store }/>, document.body);

// NOTE: exported for console inspector / interaction
import { actions } from "./shared";
window.STORE = store;
window.ACTIONS = actions;
