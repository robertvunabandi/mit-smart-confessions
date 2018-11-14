import React from "react";
import {IDS} from "../variables/identifiers.jsx";
import {APP_NAME} from "../variables/identifiers.jsx";
import {uppercaseFirstLettersSimpleString, isStringEmpty} from "../utilities/utils.jsx";

const FOOTER_OPTIONS = [
  { name: "about MIT Smart Confession", url: "/about" },
  { name: "how it works", url: "/how-it-works" },
];

class FooterContainer extends React.Component {
  componentDidMount() {
    setTimeout(FooterContainer.updateFooterHeight, 0);
    setTimeout(FooterContainer.updateFooterHeight, 50);
    window.addEventListener("resize", FooterContainer.updateFooterHeight);
    // todo - add an event handling to update the footer content when a
    // prediction is made so that the footer updates accordingly, it should
    // wait a bit before updating
    // window.addEventListener("prediction-made", FooterContainer.updateFooterHeight);
  }

  static getCssFooterTop() {
    const footer = document.querySelector("#" + IDS.footer);
    // assume the top is written in pixels
    if (isStringEmpty(footer.style.top)) {
      return 0;
    }
    return parseFloat(footer.style.top.substring(0, footer.style.top.length - 2));
  }

  static updateFooterHeight() {
    const footer = document.querySelector("#" + IDS.footer);
    const footer_top = FooterContainer.getCssFooterTop();
    const bounding_box = footer.getBoundingClientRect();
    const above_footer_height = bounding_box.top - footer_top;
    const footer_height = bounding_box.height;
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