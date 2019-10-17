import * as React from 'react'
import { Header, Container, Segment, Icon } from 'semantic-ui-react'
import { withLayout } from '../components/layout'

const AboutPage = () => {
  const aboutMe = (
    <ul>
      <li>
        <Icon name="mail" /> Mail:
        <a href="mailto:sorayamahou@gmail.com"> SoraYama's Gmail</a>
      </li>
      <li>
        <Icon name="github" /> Github:
        <a href="https://github.com/sorayama" target="blank">
          {' '}
          SoraYama{' '}
        </a>
        在 <a href="https://github.com/poooi">Poooi</a> 开发组打工
      </li>
      <li>
        <Icon name="weibo" /> Weibo:
        <a href="https://weibo.com/2844073123/profile"> @空山_真实耀月厨 </a>
      </li>
    </ul>
  )

  return (
    <Container>
      <Segment vertical className="dashed-bottom">
        <Header as="h2">
          <Header.Content>
            <Icon name="quote left" />
            关于空山和这个站
          </Header.Content>
        </Header>
      </Segment>
      <Segment vertical>
        <div>
          这里是 空山 - SoraYama 的个人博客站，托管在 GitHub Pages， 由
          <a href="https://www.gatsbyjs.org/"> gatsby 2.0</a> &
          <a href="https://github.com/fabien0102/gatsby-starter">
            {' '}
            fabien's starter{' '}
          </a>
          驱动
        </div>
        <div>
          关于我的话呢
          {aboutMe}
        </div>
      </Segment>
    </Container>
  )
}

export default withLayout(AboutPage)
