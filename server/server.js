require("dotenv").config();
const express = require("express");
const models = require("./models");
const cors = require("cors");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schema = require("./schema/schema");

const app = express();
app.use(cors());

// Replace with your mongoLab URI
const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@lyrical-gql-maumd.mongodb.net/lyric?retryWrites=true&w=majority`;
if (!MONGO_URI) {
  throw new Error("You must provide a ATLAS URI");
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .once("open", () => console.log("Connected to Atlas instance."))
  .on("error", (error) => console.log("Error connecting to Atlas:", error));

app.use(bodyParser.json());
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

// const webpackMiddleware = require("webpack-dev-middleware");
// const webpack = require("webpack");
// const webpackConfig = require("../webpack.config.js");
// app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
