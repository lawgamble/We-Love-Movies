const knex = require("../db/connection");

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}
function list(movieId) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.movie_id", "*")
    .where({ movie_id: movieId });
}

async function update(updatedReview) {
  const review_id = updatedReview.review_id;
  await knex("reviews")
    .select("*")
    .where({ review_id: review_id })
    .update(updatedReview, "*");

  return read(updatedReview.review_id);
}

function reviewCritic(criticId) {
  return knex("critics").select("*").where({ critic_id: criticId }).first();
}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

module.exports = {
  list,
  update,
  reviewCritic,
  read,
  delete: destroy,
};
