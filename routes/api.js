const express = require("express");
const router = express.Router({});
const { HTTP_CODES, FB_REACTIONS, DEFAULT_GENERATE_LENGTH } = require("../lib/constants.js");
const { randInt } = require("../lib/utils.js");
const API_URL = process.env.API_URL || "https://mit-smart-confessions-api.herokuapp.com";
const http = require("http"); // use http when working locally
const https = require("https");

/**
 * The Router Calls
 * */

router.get("/predict", function (req, res) {
  const { text } = req.query;
  if (text) {
    const url = `${API_URL}/predict?text=${encodeURIComponent(text)}`;
    makeHttpRequest(url).then(successCallback, failureCallback);
  } else {
    failureCallback({
      status: HTTP_CODES.CLIENT_ERROR.BAD_REQUEST,
      error: "There was no text input received",
      error_obj: {},
    });
  }

  function successCallback(success_obj) {
    const { status, json } = success_obj;
    if (isSuccessStatus(status)) {
      const response = extractFbReactionsFromObj(json);
      res.status(HTTP_CODES.SUCCESS.OK);
      res.send(response);
    } else {
      res.status(status);
      res.send(json);
    }
  }

  function failureCallback(failure_obj) {
    const { status, error, error_obj } = failure_obj;
    res.status(status);
    res.send({ error, error_obj });
  }
});

router.get("/generate", function (req, res) {
  const { seed_text, length } = req.query;
  if (seed_text) {
    const uri_seed_text = encodeURIComponent(seed_text);
    const seed_length = length || DEFAULT_GENERATE_LENGTH;
    const url = `${API_URL}/generate?seed=${uri_seed_text}&length=${seed_length}`;
    makeHttpRequest(url).then(successCallback, failureCallback);
  } else {
    failureCallback({
      status: HTTP_CODES.CLIENT_ERROR.BAD_REQUEST,
      error: "No seed text was given in the parameters.",
      error_obj: {},
    });
  }

  function successCallback(success_obj) {
    const { status, json } = success_obj;
    if (isSuccessStatus(status)) {
      // we are literally just sending the text over as a string
      const text_prediction = json;
      res.status(HTTP_CODES.SUCCESS.OK);
      res.send(text_prediction);
    } else {
      res.status(status);
      res.send(json);
    }
  }

  function failureCallback(failure_obj) {
    const { status, error, error_obj } = failure_obj;
    res.status(status);
    res.send({ error, error_obj });
  }
});

/**
 * Methods Used Within Router Calls
 * */

function makeHttpRequest(options) {
  return new Promise((resolve, reject) => {
    https.get(options, responseHandler).on("error", errorHandler);

    function responseHandler(response) {
      let data_stream = "";
      response.on("data", (stream) => {
        data_stream += stream;
      });
      response.on("end", () => {
        try {
          const json = JSON.parse(data_stream);
          resolve({ status: response.statusCode, json });
        } catch (exception) {
          console.warn("parsing json failed, sending string");
          resolve({ status: response.statusCode, json: data_stream });
        }
      });
    }

    function errorHandler(error_obj) {
      console.error("error when making http request with options:", options);
      reject({
        status: HTTP_CODES.SERVER_ERROR.BAD_GATEWAY,
        error: "error when making http request",
        error_obj,
      });
    }
  });
}

function isSuccessStatus(status) {
  return 200 <= status && status < 400;
}

function extractFbReactionsFromObj(json) {
  return Object.keys(FB_REACTIONS).reduce((obj, reaction) => {
    // these are going to be ranged, make sure to handle that
    // i.e., arrays of format [[min, max, prob], ...]
    obj[reaction] = json[reaction];
    return obj;
  }, {});
}

// logging url for debugging
console.log(process.env.API_URL);
console.log(API_URL);

module.exports = router;