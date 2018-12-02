import React from "react";
import {IDS, CLASSES} from "../variables/identifiers.jsx";
import {uppercaseFirstLettersSimpleString} from "../utilities/utils.jsx";
import LOGO_SRC from "../assets/msc-logo-large.png";

const NAVBAR_NAMES = {
  HOME: "home",
  PREDICT: "predict",
  GENERATE: "generate",
  UNDERSTAND: "understand",
};

const NAVBAR_OPTIONS = [
  { name: NAVBAR_NAMES.HOME, url: "/" },
  { name: NAVBAR_NAMES.PREDICT, url: "/predict" },
  { name: NAVBAR_NAMES.GENERATE, url: "/generate" },
  { name: NAVBAR_NAMES.UNDERSTAND, url: "/understand" },
];

class NavBarContainer extends React.Component {
  render() {
    return <NavBarView {...this.props}/>;
  }
}

function NavBarView(props) {
  return (
    <nav id={IDS.navBar}>
      <ul>

        {NAVBAR_OPTIONS.map((navbar_option_obj, index) => {
          const { name, url } = navbar_option_obj;
          const active_status_class = props.active_page === name
            ? " " + CLASSES.navbarOptionActiveTab
            : "";
          // todo - should display icon in case of home page
          return <li className={"navbar-option" + active_status_class} key={index}>
            <a href={url}>{uppercaseFirstLettersSimpleString(name)}</a>
          </li>;
        })}
        <li className={CLASSES.navbarOptionSeparator} key={991}>
          <span></span>
        </li>
        <li className={CLASSES.navbarOption} key={991}>
          <a href={"https://github.com/robertvunabandi/mit-smart-confessions-website"} target={"blank"}>Github:Website</a>
        </li>
        <li className={CLASSES.navbarOption} key={991}>
          <a href={"https://github.com/robertvunabandi/mit-smart-confessions-data"} target={"blank"}>Github:API</a>
        </li>
        <li id={IDS.navBarLogo} key={990}>
          <img src={LOGO_SRC}/>
        </li>
      </ul>
    </nav>
  );
}

export {
  NavBarContainer,
  NAVBAR_NAMES,
};