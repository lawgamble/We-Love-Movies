const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const movieId = res.locals.movie.movie_id;
  const reviews = await reviewsService.list(movieId);
  const formattedReviews = reviews.map((review) => {
    const { critic_id, preferred_name, surname, organization_name } = review;
    return {
      ...review,
      critic_id,
      critic: {
        critic_id,
        preferred_name,
        surname,
        organization_name,
      },
    };
  });
  return res.json({ data: formattedReviews });
}

async function update(req, res, next) {
  if (req.body.data) {
    const updatedReview = { ...res.locals.review, ...req.body.data };
    const newUpdatedReview = await reviewsService.update(updatedReview);
    newUpdatedReview.critic = await reviewsService.reviewCritic(
      updatedReview.critic_id
    );
    return res.json({ data: newUpdatedReview });
  } else {
    return next({
      status: 400,
      message: "Update failed",
    });
  }
}

async function reviewIdExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await reviewsService.read(Number(reviewId));
  if (review) {
    res.locals.review = review;
    return next();
  } else {
    return next({
      status: 404,
      message: "Review cannot be found.",
    });
  }
}

async function destroy(req, res, next) {
  const { review_id } = res.locals.review;
  await reviewsService.delete(review_id);
  return res.sendStatus(204);
}

module.exports = {
  update: [asyncErrorBoundary(reviewIdExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewIdExists), asyncErrorBoundary(destroy)],
  list: [asyncErrorBoundary(list)],
};
