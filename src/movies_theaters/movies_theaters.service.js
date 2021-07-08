const knex = require("../db/connection");

function list() {
  return knex("movies_theaters").select("*");
}

module.exports = {
  list,
};
