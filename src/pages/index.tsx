import * as React from 'react'
import Typed from 'typed.js'
import Link from 'gatsby-link'
import HeaderMenu from '../components/HeaderMenu/HeaderMenu'
import { menuItems, withLayout } from '../components/Layout'
import { Segment, Container, Header } from 'semantic-ui-react'

interface IndexPageProps {
  location: {
    pathname: string
  }
}
class Home extends React.Component<IndexPageProps> {
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
      detect_on: 'window',
      events: {
        onclick: {
          enable: false,
        },
      },
    },
    retina_detect: true,
  }

  componentDidMount() {
    window.particlesJS('home-particles', this.particleJSON)
  }

  render() {
    return (
      <div>
        {/* Master head */}
        <Segment vertical textAlign="center" className="masthead">
          <div id="home-particles" />
          <HeaderMenu
            Link={Link}
            pathname={this.props.location.pathname}
            items={menuItems}
            inverted
          />
          <Container text style={{ display: 'flex', justifyContent: 'center' }}>
            <Header id="sorayama" inverted as="h1">
              SoraYama's Personal Blog
            </Header>
          </Container>
        </Segment>
      </div>
    )
  }
}

export default withLayout(Home)
