import * as React from "react";
import Typed from "typed.js";
import Link from "gatsby-link";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import { menuItems } from "../layouts";
import {
  Button,
  Segment,
  Container,
  Grid,
  Header,
  Icon,
} from "semantic-ui-react";

interface IndexPageProps {
  location: {
    pathname: string;
  };
}

export default class Home extends React.Component<IndexPageProps> {
  particleJSON = {
    particles: {
      number: {
        value: 60,
        density: {
          enable: false,
        },
      },
      opacity: {
        value: 0.5,
      },
      size: {
        value: 1,
        random: false,
      },
      line_linked: {
        opacity: 0.1,
      },
      move: {
        speed: 1,
      },
    },
    interactivity: {
      detect_on: "window",
      events: {
        onclick: {
          enable: false,
        },
      },
    },
    retina_detect: true,
  };

  private typedInstance: Typed;

  componentDidMount() {
    window.particlesJS("home-particles", this.particleJSON);
    this.typedInstance = new Typed("#sorayama", {
      strings: ["这里是空山", "SoraYama", "一个写点前端的人", "是足球裁判", "很高兴认识你。"],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 50,
    });
  }

  componentWillUnmount() {
    if (this.typedInstance) {
      this.typedInstance.destroy();
    }
  }

  render() {
    return (
      <div>
        {/* Master head */}
        <Segment vertical textAlign="center" className="masthead">
          <div id="home-particles" />
          <HeaderMenu
            Link={Link} pathname={this.props.location.pathname} items={menuItems} inverted
          />
          <Container text style={{ display: "flex", justifyContent: "center" }}>
            <Header id="sorayama" inverted as="h1" />
          </Container>
        </Segment>
      </div>
    );
  }
}
