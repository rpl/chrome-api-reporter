import React from "react";

import { List, Item, Icon, Content } from "./semantic"

class NestedAPIProperty extends React.Component {
  render() {
    let { propertyName, propertyValue } = this.props;
    let { opened } = this.state || {};

    let onItemClick = ::this.onItemClick;

    return !opened ? (
      <Item onClick={ onItemClick }>
        <Icon iconId="caret right"></Icon>
        <Content style={{ paddingLeft: 0 }}>
          <b>{ propertyName }</b>: <i>...</i>
        </Content>
      </Item>
    ) : (
      <Item>
        <Icon onClick={ onItemClick } iconId="caret down"></Icon>
        <Content style={{ paddingLeft: 0 }}>
          <b onClick={ onItemClick }> { propertyName }</b>:
          <APIDescriptor apiDescriptor={ propertyValue }></APIDescriptor>
        </Content>
      </Item>
    );
  }

  onItemClick(evt) {
    console.log("ON ITEM CLICK");
    this.setState({
      opened: this.state ? !this.state.opened : true
    })
  }
}

export default class APIDescriptor extends React.Component {
  render() {
    let { apiDescriptor } = this.props;
    return <List style={{ paddingTop: "0.2em" }}>
      {
        Object.keys(apiDescriptor).map((key) => {
          let value = apiDescriptor[key];

          if (value) {
            switch (typeof value) {
            case "string":
              return (
                <Item>
                  <Content style={{ paddingLeft: 0 }}>
                    <b>{ key }</b>: <i>{ value }</i>
                  </Content>
                </Item>
              );
            case "object":
              return (
                <NestedAPIProperty propertyName={ key }
                                   propertyValue={ value }>
                </NestedAPIProperty>
              );
            }
          }
        })
      }
    </List>;
  }
}
