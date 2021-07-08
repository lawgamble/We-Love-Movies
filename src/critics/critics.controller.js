const criticsService = require("./critics.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const criticData = await criticsService.list();
  res.json({ data: criticData });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
};
