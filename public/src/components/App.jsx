import React from "react";
import {NavBarContainer, NAVBAR_NAMES} from "./NavigationBar.jsx";
import FooterContainer from "./Footer.jsx";
import "../styles/main.scss";
import {IDS} from "../variables/identifiers.jsx";
import NoticeSectionContainer from "./NoticeSection.jsx";

class AppContainer extends React.Component {
  render() {
    return <AppView {...this.props} />;
  }
}

function AppView(props) {
  return (
    <div>
      <NavBarContainer active_page={props.active_page}/>
      <div id={IDS.rootInit}>{props.children}</div>
      <FooterContainer />
      <NoticeSectionContainer lifetime={5}/>
    </div>
  );
}

export default AppContainer;