const https = require("https");
const request = require("request");
const util = require("util");
const {
  consumer_key,
  consumer_secret,
  access_token,
  access_secret
} = require("../config/keys");

const get = util.promisify(request.get);
const post = util.promisify(request.post);

const bearerTokenURL = new URL("https://api.twitter.com/oauth2/token");
const streamURL = new URL(
  "https://api.twitter.com/labs/1/tweets/stream/filter"
);
const rulesURL = new URL(
  "https://api.twitter.com/labs/1/tweets/stream/filter/rules"
);

async function bearerToken(auth) {
  const requestConfig = {
    url: bearerTokenURL,
    auth: {
      user: consumer_key,
      pass: consumer_secret
    },
    form: {
      grant_type: "client_credentials"
    }
  };

  const response = await post(requestConfig);
  return JSON.parse(response.body).access_token;
}

async function getAllRules(token) {
  const requestConfig = {
    url: rulesURL,
    auth: {
      bearer: token
    }
  };

  const response = await get(requestConfig);
  if (response.statusCode !== 200) {
    throw new Error(response.body);
    return null;
  }

  return JSON.parse(response.body);
}

async function deleteAllRules(rules, token) {
  if (!Array.isArray(rules.data)) {
    return null;
  }

  const ids = rules.data.map(rule => rule.id);

  const requestConfig = {
    url: rulesURL,
    auth: {
      bearer: token
    },
    json: {
      delete: {
        ids: ids
      }
    }
  };

  const response = await post(requestConfig);
  if (response.statusCode !== 200) {
    throw new Error(JSON.stringify(response.body));
    return null;
  }

  return response.body;
}

async function setRules(rules, token) {
  const requestConfig = {
    url: rulesURL,
    auth: {
      bearer: token
    },
    json: {
      add: rules
    }
  };

  const response = await post(requestConfig);
  if (response.statusCode !== 201) {
    throw new Error(JSON.stringify(response.body));
    return null;
  }

  return response.body;
}

function streamConnect(token) {
  console.log("Listen to the stream");
  const config = {
    url: "https://api.twitter.com/labs/1/tweets/stream/filter?format=compact",
    auth: {
      bearer: token
    },
    timeout: 20000
  };

  const stream = request.get(config);

  return stream;
}

const handleStreams = (token, stream, emitter) => {
  let timeout = 0;

  stream
    .on("timeout", () => {
      // Reconnect on error
      console.warn("A connection error occurred. Reconnecting…");
      setTimeout(() => {
        timeout++;
        streamConnect(token);
      }, 2 ** timeout);
      streamConnect(token);
    })
    .on("data", data => {
      try {
        const json = JSON.parse(data);
        emitter.emit("push", json.data);
      } catch (e) {
        // Heartbeat received. Do nothing.
      }
    })
    .on("error", error => {
      if (error.code === "ETIMEDOUT") {
        stream.emit("timeout");
      }
    });
};

//mine
const TwitterCient = () => {
  // const stream = async (req, res) => {
  //   try {
  //     //res.write(await streamRequest(generateHeader(path, params, method, "stream"), params));
  //     let token = await bearerToken({ consumer_key, consumer_secret });

  //     const tStream = streamConnect(token);
  //     handleStreams(token, tStream, res);
  //   } catch (e) {
  //     //res.status(500).send(e);
  //     console.log(JSON.stringify(e));
  //   }
  // };

  const stream = async emitter => {
    try {
      let token = await bearerToken({ consumer_key, consumer_secret });

      const tStream = streamConnect(token);
      handleStreams(token, tStream, emitter);
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  };

  const post = () => {}; //TO-DO

  const get = () => {}; //TO-DO

  return {
    stream,
    post,
    get
  };
};

module.exports = TwitterCient;
