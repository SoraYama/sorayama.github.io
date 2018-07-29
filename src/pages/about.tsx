import * as React from "react";
import { Header, Container, Segment, Icon } from "semantic-ui-react";

export default () => {
  const aboutMe = (
    <ul>
      <li>
        <Icon name="mail"/> Mail:
        <a href="mailto:sorayamahou@gmail.com"> SoraYama's Gmail</a>
      </li>
      <li>
        <Icon name="github"/> Github:
        <a href="https://github.com/sorayama" target="blank"> SoraYama </a>
        在 <a href="https://github.com/poooi">Poooi</a> 开发组打工（发微博
      </li>
      <li>
        <Icon name="weibo"/> Weibo:
        <a href="https://weibo.com/2844073123/profile"> @空山_真实耀月厨 </a>
      </li>
    </ul>
  );

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
        <p>
          这里是 空山 - SoraYama 的个人博客站，托管在 github pages，
          由
            <a href="https://www.gatsbyjs.org/"> gatsby 1.0</a> &
            <a href="https://github.com/fabien0102/gatsby-starter"> fabien's starter </a>
          强力驱动
        </p>
        <p>
          关于我的话呢
          {aboutMe}
        </p>
      </Segment>
    </Container>
  );
};
