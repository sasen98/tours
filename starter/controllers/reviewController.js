const Review = require('./../models/reviewModel');
const factory = require('./handlerFactory');

exports.getAllReviews = factory.getAll(Review);
//  catchAsync(async (req, res, next) => {
//   let filter = {};
//   if (req.params.tourId) {
//     filter = { tour: req.params.tourId };
//   }
//   const reviews = await Review.find(filter);
//   res.status(200).json({
//     status: 'success',
//     results: reviews.length,
//     data: {
//       reviews,
//     },
//   });
// });

/// middle ware
exports.setTourUserIds = (req, res, next) => {
  /// allow nested routes
  if (!req.body.tour) {
    req.body.tour = req.params.tourId;
  }
  if (!req.body.user) {
    req.body.uer = req.user.id;
  }
  next();
};

exports.createReview = factory.createOne(Review);
// catchAsync(async (req, res, next) => {
//   /// allow nested routes
//   if (!req.body.tour) {
//     req.body.tour = req.params.tourId;
//   }
//   if (!req.body.user) {
//     req.body.uer = req.user.id;
//   }
//   const newReview = await Review.create(req.body);
//   res.status(201).json({
//     status: 'success',
//     data: {
//       review: newReview,
//     },
//   });
// });

exports.updateReviewById = factory.updateById(Review);

exports.deleteReviewById = factory.deleteById(Review);

exports.getReview = factory.getOne(Review);
