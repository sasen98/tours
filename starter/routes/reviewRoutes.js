const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');
const router = express.Router({
  mergeParams: true, /// by default each router has access to the parameters of their specific routes and this changes that
});
router.use(authController.protect);
router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReviewById
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReviewById
  );

module.exports = router;
