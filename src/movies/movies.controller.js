const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const { is_showing } = req.query;
  if (is_showing === "true") {
    return res.json({ data: await moviesService.listIsShowingTrue(true) });
  } else {
    return res.json({ data: await moviesService.list() });
  }
}

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await moviesService.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: "Movie Not Found." });
}

async function read(req, res, next) {
  return res.json({ data: res.locals.movie });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  movieExists: [asyncErrorBoundary(movieExists)],
};
