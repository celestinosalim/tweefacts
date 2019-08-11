require("dotenv").config();

const { API_KEY, SECRET_KEY, ACCESS_TOKEN, ACCESS_TOKEN_SECRET } = process.env;

const Twit = require("twit");

const T = new Twit({
  consumer_key: API_KEY,
  consumer_secret: SECRET_KEY,
  access_token: ACCESS_TOKEN,
  access_token_secret: ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true // optional - requires SSL certificates to be valid.
});
