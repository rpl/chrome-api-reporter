import React from "react";

import { Grid, Column, Content } from "../components/semantic";

import APIDescriptorsView from "./api-descriptors-view.jsx";
import DebugPanel from "./debug-panel.jsx";

export default class PageGrid extends React.Component {
  render() {
    return (
      <div style={{ padding: "2em" }}>
        <Grid>
          <Column className="sixteen wide">
            <APIDescriptorsView></APIDescriptorsView>
          </Column>
          <Column className="six wide" style={{ display: "none" }}>
            <DebugPanel></DebugPanel>
          </Column>
        </Grid>
      </div>
    );
  }
}
