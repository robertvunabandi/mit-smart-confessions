import React from "react";
import {IDS} from "../variables/identifiers.jsx";
import {APP_NAME} from "../variables/identifiers.jsx";
import {uppercaseFirstLettersSimpleString} from "../utilities/utils.jsx";

const FOOTER_OPTIONS = [
  { name: "privacy", url: "/privacy" },
  { name: "about MIT Smart Confession", url: "/about" },
  { name: "how it works", url: "/how-it-works" },
];

class FooterContainer extends React.Component {
  componentDidMount() {
    console.log("mounted footer");
    setTimeout(FooterContainer.updateFooterHeight, 0);
    setTimeout(FooterContainer.updateFooterHeight, 50);
    window.addEventListener("resize", FooterContainer.updateFooterHeight);
  }

  static updateFooterHeight() {
    const footer = document.querySelector("#" + IDS.footer);
    const root_init = document.querySelector("#" + IDS.rootInit);
    const navbar = document.querySelector("#" + IDS.navBar);
    const footer_height = footer.clientHeight;
    const above_footer_height = root_init.clientHeight + navbar.clientHeight;
    const window_height = window.innerHeight;
    if (above_footer_height + footer_height <= window_height) {
      const top_to_fill_window_height = window_height - (above_footer_height + footer_height);
      footer.style.top = top_to_fill_window_height + "px";
    } else if (above_footer_height + footer_height > window_height) {
      footer.style.top = null;
    }
  }

  render() {
    return <FooterView {...this.props} />;
  }
}

function FooterView(props) {
  return (
    <footer id={IDS.footer}>
      <ul>
        {FOOTER_OPTIONS.map((navbar_option_obj, index) => {
          const { name, url } = navbar_option_obj;
          // todo - should display icon in case of home page
          return <li className={"footer-item"} key={index}>
            <a href={url}>{uppercaseFirstLettersSimpleString(name)}</a>
          </li>;
        })}
      </ul>
      <br/>
      Copyright &#9400; 2018-2019 {APP_NAME}
    </footer>
  );
}

export default FooterContainer;