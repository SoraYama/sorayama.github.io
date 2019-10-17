import * as React from 'react'
import { Header, Segment, Icon } from 'semantic-ui-react'

export default () => {
  return (
    <Segment vertical className="dashed-bottom">
      <Header as="h2">
        <Icon name="newspaper" />
        <Header.Content>博客们</Header.Content>
      </Header>
    </Segment>
  )
}
