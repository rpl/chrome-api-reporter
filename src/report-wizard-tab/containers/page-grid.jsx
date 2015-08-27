import React from "react";

import { Grid, Column } from "../components/semantic";

import APIDescriptorsView from "./api-descriptors-view.jsx";
import DebugPanel from "./debug-panel.jsx";

export default class PageGrid extends React.Component {
  render() {
    return (
      <Grid>
        <Column className="ten wide">
          <APIDescriptorsView></APIDescriptorsView>
        </Column>
        <Column className="six wide">
          <DebugPanel></DebugPanel>
        </Column>
      </Grid>
    );
  }
}
