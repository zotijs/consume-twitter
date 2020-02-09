const { OAuth2 } = require("oauth");
const keys = require("../config/keys");

let authObj = {};

const getBearerToken = () =>
  new Promise((resolve, reject) =>
    new OAuth2(
      keys.consumer_key,
      keys.consumer_secret,
      "https://api.twitter.com/",
      null,
      "oauth2/token",
      null
    ).getOAuthAccessToken(
      "",
      { grant_type: "client_credentials" },
      (e, access_token, refresh_token, results) => {
        e && reject(e);
        access_token && resolve(access_token);
      }
    )
  );

const getAuthorized = async () => {
  if (authObj.bearer_token) return authObj;

  const response = await getBearerToken();

  if (response.error) throw new Error(e);

  authObj = {
    ...authObj,
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    bearer_token: response
  };

  return authObj;
};

module.exports = {
  getAuthorized
};
