//const _ = require("lodash");
const { EventEmitter } = require("events");
const TwitterClient = require("../services/twitter");

const Stream = new EventEmitter();

module.exports = app => {
  app.get("/statuses", async (req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Content-Encoding": "none"
    });

    const client = TwitterClient();
    const emitter = Stream.on("push", ({ id, text }) => {
      res.write(`id: ${id}\ndata: ${text}\n\n`);
    });
    //client.stream(req, res);
    client.stream(emitter);
  });
};
