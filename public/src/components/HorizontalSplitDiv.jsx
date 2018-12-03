import React from "react";
import PropTypes from "prop-types";
import {CLASSES} from "../variables/identifiers.jsx";
import "../styles/horizontal_split_div.scss";


export default class HorizontalSplitDivContainer extends React.Component {
  render() {
    const split_class = `${CLASSES.horizontalSplitDiv}-${this.props.children.length}`;
    return (
      <HorizontalSplitDivView
        className={this.props.className}
        split_class={CLASSES.horizontalSplitDiv + " " + split_class}
        children={this.props.children} />
    );
  }
}

HorizontalSplitDivContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

function HorizontalSplitDivView(props) {
  const class_name = !!props.className ? " " + props.className : "";
  return (
    <div className={CLASSES.horizontalSplitDivParent + class_name}>
      {props.children.map((child, index) => {
        return (
          <div
            className={props.split_class}
            key={`${CLASSES.horizontalSplitDiv}-${index}`}>
            {child}
          </div>
        );
      })}
    </div>
  );
}

HorizontalSplitDivView.propTypes = {
  split_class: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};