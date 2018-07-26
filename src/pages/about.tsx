import * as React from "react";
import { Header, Container, Segment, Icon } from "semantic-ui-react";

export default () => {
  return (
    <Container>
      <Segment vertical className="dashed-bottom">
        <Header as="h2">
          <Icon name="info circle" />
          <Header.Content>
            我是谁
          </Header.Content>
        </Header>
      </Segment>
      <Segment vertical>
        <p>
          <Icon name="github"/>
          <a href="https://github.com/sorayama" target="blank">SoraYama</a>
        </p>
      </Segment>
    </Container>
  );
};
