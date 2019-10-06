const Twitter = require("twitter");
const keys = require("../config/keys");
const token = require("../config/token");

const client = new Twitter({
  consumer_key: keys.consumer_key,
  consumer_secret: keys.consumer_secret,
  bearer_token: token.bearer_token
});

module.exports = {
  client
};
