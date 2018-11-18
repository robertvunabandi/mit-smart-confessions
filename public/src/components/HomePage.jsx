import React from "react";
import LineBreakContainer from "./LineBreak.jsx";
import "../styles/home_page.scss";
import {IDS, CLASSES} from "../variables/identifiers.jsx";
import HorizontalSplitDivContainer from "./HorizontalSplitDiv.jsx";

export default class HomePageContainer extends React.Component {
  render() {
    return <HomePageView />;
  }
}

function HomePageView() {
  return (
    <div id={IDS.homePage} className={CLASSES.pageWrapper} >
      <h1>Welcome to MIT Smart Confession</h1>
      <br/>
      We use machine learning to take confessions to the next level. Take a look
      at the tools that we offer.
      <br/>
      <br/>
      <LineBreakContainer />
      <HorizontalSplitDivContainer>
        <div className={CLASSES.homePageBlock}>
          <h3>Confession Rater</h3>
          Predict how popular your confession will be.
          <br />
          <br />
          <a href={"/predict"}>
            Try it
          </a>
        </div>
        <div className={CLASSES.homePageBlock}>
          <h3>Smart Confession Completion</h3>
          Start writing, let our tool complete the confession to maximize popularity.
          <br />
          <br />
          <a href={"/generate"}>
            Try it
          </a>
        </div>
        <div className={CLASSES.homePageBlock}>
          <h3>Understanding Confessions</h3>
          Understand what makes some confessions more popular than others.
          <br />
          <br />
          <a href={"/understand"}>
            View Explanations
          </a>
        </div>
      </HorizontalSplitDivContainer>
      <LineBreakContainer />
      <br />
      If interested, we can tell you about <a href={"/how-it-works"}>how this works</a> behind
      the scene.
    </div>
  );
}