const express = require("express");
const router = express.Router({});
const APP_TITTLE = require("../lib/constants.js").APP_TITTLE;

function getPageTitle(title) {
  if (title && title.toString().length > 0) {
    return `${APP_TITTLE} | ${title}`;
  }
  return APP_TITTLE;
}

/**
 * GET /
 * outputs the home page of the application
 **/
router.get("/", function (req, res) {
  res.render("home", { title: getPageTitle("Home") });
});
// including "/home" here, which basically redirects to "/"
router.get("/home", (req, res) => res.redirect("/"));

/**
 * GET /predict
 **/
router.get("/predict", function (req, res) {
  res.render("predict", { title: getPageTitle("Predict") });
});

/**
 * GET /generate
 **/
router.get("/generate", function (req, res) {
  res.render("generate", { title: getPageTitle("Generate") });
});

/**
 * GET /understand
 **/
router.get("/understand", function (req, res) {
  res.render("understand", { title: getPageTitle("Understand") });
});

/**
 * GET /about
 **/
router.get("/about", function (req, res) {
  res.render("about", { title: getPageTitle("About") });
});

/**
 * GET /privacy
 **/
router.get("/privacy", function (req, res) {
  res.render("privacy", { title: getPageTitle("Privacy") });
});

/**
 * GET /how-it-works
 **/
router.get("/how-it-works", function (req, res) {
  res.render("how-it-works", { title: getPageTitle("How It Works") });
});

/**
 * GET /error
 * one shouldn't fetch the error page manually, so redirect to the
 * home page
 **/
router.get("/error", function (req, res) {
  res.redirect("/");
});

module.exports = router;
