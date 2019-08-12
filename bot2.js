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

const postTweet = () => {
  let r = Math.floor(Math.random() * 100);

  let tweet = {
    status: `${r} random Tweet from Node JS`
  };

  const tweeted = (err, data, response) => {
    if (err) {
      console.log("something is wrong", err);
    } else {
      console.log("It Worked!");
    }
  };

  T.post("statuses/update", tweet, tweeted);
};

setInterval(postTweet, 1000 * 20);
