const movies_theatersService = require("./movies_theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  res.json({ data: await movies_theatersService.list() });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
};
