/**
 * This file contains methods to make "api" calls to the back-end.
 **/
const API = {};

API.formatParams = function (params) {
  return Object
    .keys(params)
    .map(function (key) {
      return key + "=" + encodeURIComponent(params[key]);
    })
    .join("&");
};

API.get = function (endpoint, params, successCallback, failureCallback) {
  const xhr = new XMLHttpRequest();
  const fullPath = endpoint + "?" + API.formatParams(params);
  xhr.open("GET", fullPath, true);
  xhr.onload = function (error) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        if (successCallback) {
          let output;
          try {
            // this won't work for responses that are just a sentence,
            // so we do a try catch around it so that we can have this
            // problem solved
            output = JSON.parse(xhr.responseText);
          } catch (e) {
            output = xhr.responseText;
          }
          successCallback(output);
        }
      } else if (failureCallback) {
        failureCallback({text: xhr.statusText, url: xhr.responseURL});
      }
    }
  };
  xhr.onerror = function (error) {
    failureCallback({text: xhr.statusText, url: xhr.responseURL, error: error});
  };
  xhr.send(null);
};

API.post = function (endpoint, params, successCallback, failureCallback) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", endpoint, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.withCredentials = true;
  xhr.onload = function (error) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        if (successCallback) {
          successCallback(JSON.parse(xhr.responseText));
        }
      } else if (failureCallback) {
        failureCallback({text: xhr.statusText, url: xhr.responseURL});
      }
    }
  };
  xhr.onerror = function (error) {
    failureCallback({text: xhr.statusText, url: xhr.responseURL, error: error});
  };
  xhr.send(JSON.stringify(params));
};

export default API;