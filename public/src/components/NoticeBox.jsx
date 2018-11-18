import React from "react";
import PropTypes from "prop-types";
import {CLASSES} from "../variables/identifiers.jsx";
import "../styles/notice_box.scss";
import {NOTICE_TYPES} from "./NoticeSection.jsx";

const propTypes = {
  text: PropTypes.string.isRequired,
  // must be one of NOTICE_TYPES
  type: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default class NoticeBoxContainer extends React.Component {
  static getNoticeClass(type) {
    switch (NOTICE_TYPES[type.toUpperCase()]) {
      case NOTICE_TYPES.INFORMATION:
        return `${CLASSES.noticeBoxInformation}`;
      case NOTICE_TYPES.WARNING:
        return `${CLASSES.noticeBoxWarning}`;
      case NOTICE_TYPES.ERROR:
        return `${CLASSES.noticeBoxError}`;
      default:
        // will throw if the notice type is null
        throw new Error("Invalid type received");
    }
  }

  render() {
    return <NoticeBoxView {...this.props}/>;
  }
}

NoticeBoxContainer.propTypes = propTypes;

function NoticeBoxView(props) {
  return (
    <div className={CLASSES.noticeBoxWrapper}>
      <div className={`${CLASSES.noticeBoxClose}`}>
        <input type={"button"} value={"close"} onClick={props.close}/>
      </div>
      <div className={`${CLASSES.noticeBox} ${NoticeBoxContainer.getNoticeClass(props.type)}`}>
        {props.text}
      </div>
    </div>
  );
}