const APP_TITTLE = "MIT Smart Confession";
const FB_REACTIONS = {
  like: "like",
  love: "love",
  haha: "haha",
  wow: "wow",
  sad: "sad",
  angry: "angry",
};
const FB_REACTIONS_ORDER = {
  like: 1,
  love: 2,
  haha: 3,
  wow: 4,
  sad: 5,
  angry: 6,
};
const HTTP_CODES = {
  // 1xx
  // there is no need for those at the moment
  // 2xx
  SUCCESS: {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
  },
  // 3xx
  REDIRECTION: {
    MULTIPLE_CHOICES: 300,
    MOVED_PERMANENTLY: 301,
    // FOUND - we're going to a completely different url
    FOUND: 302,
  },
  // 4xx
  CLIENT_ERROR: {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    // GONE - resource removed, but can use NOT_FOUND instead
    GONE: 410,
    TOO_MANY_REQUESTS: 429,
    UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  },
  // 5xx
  SERVER_ERROR: {
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
  },
};
const DEFAULT_GENERATE_LENGTH = 20;

module.exports = {
  APP_TITTLE,
  FB_REACTIONS,
  FB_REACTIONS_ORDER,
  HTTP_CODES,
  DEFAULT_GENERATE_LENGTH,
};