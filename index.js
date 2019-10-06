const express = require("express");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
const authorization = require("./services/authorization");

const app = express();

//middlewares>
app.use(bodyParser.json());
//<middlewares

//get bearer token from twitter api
authorization.authorize();

//require("./routes/authRoutes")(app);

if (process.env.NODE_ENV === "production") {
  //express will serve production assets like
  //main.js or/and main.css
  app.use(express.static("client/build"));

  //express will serve the index.html file
  //if it doesn't know the route
  //handle client side (React Router) routes
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
