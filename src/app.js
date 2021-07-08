// if (process.env.USER) require("dotenv").config();
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const cors = require("cors");
const app = express();

const moviesRouter = require("./movies/movies.router");
const movies_theatersRouter = require("./movies_theaters/movies_theaters.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");
const criticsRouter = require("./critics/critics.router");

const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/movies_theaters", movies_theatersRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);
app.use("/critics", criticsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
