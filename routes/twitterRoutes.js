import _ from "lodash";
import { client } from "../services/twitter";

module.exports = app => {
  app.post("/", async (req, res) => {
    const { filter } = req.body;

    try {
      const stream = client.stream("statuses/filter", {
        track: `${filter && filter.length > 0 ? filter : "javascript"}`
      });
      stream.on("data", function(event) {
        console.log(event && event.text);
      });

      stream.on("error", function(error) {
        throw error;
      });
    } catch (err) {
      console.log("Streams Error, ", err);
      res.status(500).send("Streams error");
    }
  });
};
