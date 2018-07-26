import Link from "gatsby-link";
import * as React from "react";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import SidebarMenu from "../components/SidebarMenu/SidebarMenu";
import { Segment, Icon, Container, Sidebar, Button } from "semantic-ui-react";
import "../css/styles.css";
import "../css/override.css";
import "../css/responsive.css";
import "../css/semantic.min.css";
import "prismjs/themes/prism-okaidia.css";
import { Provider } from "react-redux";
import { store } from "../store";

declare global {
  interface Window {
    particlesJS: any;
  }
}

export const menuItems = [
  { name: "Home", path: "/", exact: true, icon: "home", inverted: true },
  { name: "Blog", path: "/blog/", exact: false, icon: "newspaper" },
  { name: "About", path: "/about/", exact: true, icon: "info circle" },
];

interface DefaultLayoutProps extends React.HTMLProps<HTMLDivElement> {
  location: {
    pathname: string;
  };
  children: any;
}
export default class DefaultLayout extends React.PureComponent<DefaultLayoutProps, void> {
  render() {
    const { pathname } = this.props.location;
    const isHome = pathname === "/";

    return (
      <Provider store={store}>
        <Sidebar.Pushable as={Segment}>

          <SidebarMenu Link={Link} pathname={pathname} items={menuItems} visible={false} />

          <Sidebar.Pusher style={{ minHeight: "100vh", position: "relative" }}>
            {/* Header */}
            {isHome ? null : <HeaderMenu
              Link={Link}
              pathname={pathname}
              items={menuItems}
            />}

            {/* Render children pages */}
            <div style={{ paddingBottom: isHome ? "" : 60 }}>
              {this.props.children()}
            </div>

          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Provider>
    );
  }
}
