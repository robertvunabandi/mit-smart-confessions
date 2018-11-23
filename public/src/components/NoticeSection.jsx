import React from "react";
import PropTypes from "prop-types";
import { IDS, CLASSES, EVENTS } from "../variables/identifiers.jsx";
import NoticeBoxContainer from "./NoticeBox.jsx";
import "../styles/notice_section.scss";

const NOTICE_TYPES = {
  WARNING: "warning",
  ERROR: "error",
  INFORMATION: "information",
};

export {NOTICE_TYPES};

const propTypes = {
  lifetime: 5,
};
const defaultProps = {
  lifetime: PropTypes.number,
};

export default class NoticeSectionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = NoticeSectionContainer.defaultState;
  }

  static get defaultState() {
    return {
      id: 0,
      notices: [],
      is_revealed: false,
    };
  }

  componentDidMount() {
    window.addEventListener(EVENTS.notice, this.addNoticeFromEventListener.bind(this));
  }

  addNoticeFromEventListener(event) {
    const { text, type } = event.detail;
    this.addNotice(text, type);
  }

  static dispatchNotice(text, type) {
    const detail = { text, type };
    window.dispatchEvent(new CustomEvent(EVENTS.notice, { detail }));
  }

  /**
   * add notice to the notice section to be displayed.
   * todo - would be nice to also display the time at which it was generated
   * @param {String} text
   * @param {String} type
   * */
  addNotice(text, type) {
    const new_notice = { text, type };
    this.setState((prev_state, _) => {
      const notices = prev_state.notices.map((notice) => notice);
      const id = prev_state.id + 1;
      new_notice.id = id;
      notices.push(new_notice);
      return { notices, id, is_revealed: true };
    });
  }

  /**
   * remove the notice with the given id
   * @param {String} id
   * */
  removeNotice(id) {
    this.setState((prev_state, _) => {
      const notices = [];
      prev_state.notices.forEach((notice) => {
        if (notice.id !== id) {
          notices.push(notice);
        }
      });
      return { notices, is_revealed: notices.length > 0 };
    });
  }

  hide() {
    this.setState({ is_revealed: false });
  }

  render() {
    return (
      <NoticeSectionView
        notices={this.state.notices}
        is_revealed={this.state.is_revealed}
        hide={this.hide.bind(this)}
        removeNotice={this.removeNotice.bind(this)}
      />
    );
  }
}

NoticeSectionContainer.propTypes = propTypes;
NoticeSectionContainer.defaultProps = defaultProps;

function NoticeSectionView(props) {
  const revealed_class = props.is_revealed
    ? CLASSES.noticeSectionRevealed
    : CLASSES.noticeSectionHidden;
  return (
    <div id={`${IDS.noticeSection}`} className={revealed_class}>
      <div id={IDS.noticeSectionClose}>
        <div onClick={props.hide}>Close</div>
      </div>
      {props.notices.map(notice => {
        return <NoticeBoxContainer {...notice} close={() => props.removeNotice(notice.id)}/>;
      })}
      {props.notices.length === 0
        ? <div className={CLASSES.noticeSectionText}>Nothing to see!</div>
        : null}
    </div>
  );
}

NoticeSectionView.propTypes = {
  notices: PropTypes.array.isRequired,
  is_revealed: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  removeNotice: PropTypes.func.isRequired,
};