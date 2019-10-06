const https = require("https");
const keys = require("../config/keys");
const token = require("../config/token");

//needs logic for token refresh ?
const authorize = async () => {
  if (token.bearer_token && token.bearer_token.length > 0)
    return token.bearer_token;

  const credentials = `${keys.consumer_key}:${keys.consumer_secret}`;
  const options = {
    hostname: "api.twitter.com",
    port: 443,
    path: "/oauth2/token",
    method: "POST",
    headers: {
      Autorization: `Basic ${new Buffer(credentials).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: "grant_type=client_credentials"
  };

  try {
    const response = await https.request(options);
    token.bearer_token = response.access_token;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  authorize: authorize
};
