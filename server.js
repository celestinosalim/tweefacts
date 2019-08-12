const express = require("express");
const bodyParser = require("body-parser");
const twitterWebhooks = require("twitter-webhooks");
const https = require("https");

const app = express();
app.use(bodyParser.json());

const { API_KEY, SECRET_KEY, ACCESS_TOKEN, ACCESS_TOKEN_SECRET } = process.env;

const userActivityWebhook = twitterWebhooks.userActivity({
  serverUrl: "https://tweefacts.herokuapp.com/",
  route: "/", //default : '/'
  consumerKey: API_KEY,
  consumerSecret: SECRET_KEY,
  accessToken: ACCESS_TOKEN,
  accessTokenSecret: ACCESS_TOKEN_SECRET,
  environment: "dev", //default : 'env-beta'
  app
});

//Register your webhook url - just needed once per URL
userActivityWebhook.register();

//Subscribe for a particular user activity
userActivityWebhook
  .subscribe({
    userId: "@tweefacts1",
    accessToken: ACCESS_TOKEN,
    accessTokenSecret: ACCESS_TOKEN_SECRET
  })
  .then(function(userActivity) {
    userActivity
      .on("favorite", data => console.log(userActivity.id + " - favorite"))
      .on("tweet_create", data =>
        console.log(userActivity.id + " - tweet_create")
      )
      .on("follow", data => console.log(userActivity.id + " - follow"))
      .on("mute", data => console.log(userActivity.id + " - mute"))
      .on("revoke", data => console.log(userActivity.id + " - revoke"))
      .on("direct_message", data =>
        console.log(userActivity.id + " - direct_message")
      )
      .on("direct_message_indicate_typing", data =>
        console.log(userActivity.id + " - direct_message_indicate_typing")
      )
      .on("direct_message_mark_read", data =>
        console.log(userActivity.id + " - direct_message_mark_read")
      )
      .on("tweet_delete", data =>
        console.log(userActivity.id + " - tweet_delete")
      );
  });

//listen to any user activity
userActivityWebhook.on("event", (event, userId, data) =>
  console.log(userId + " - favorite")
);

//listen to unknown payload (in case of api new features)
userActivityWebhook.on("unknown-event", rawData => console.log(rawData));

// const server = https.createServer({
//   ...yourHttpsConfig
// });

app.listen(443);
