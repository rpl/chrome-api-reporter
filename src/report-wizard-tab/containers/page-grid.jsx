import React from "react";

import { Grid, Column } from "../components/semantic";

import DebugPanel from "./debug-panel.jsx";

export default class PageGrid extends React.Component {
  render() {
    return (
      <Grid>
        <Column className="ten wide">
          <h1>Main Area</h1>
        </Column>
        <Column className="six wide">
          <DebugPanel></DebugPanel>
        </Column>
      </Grid>
    );
  }
}
