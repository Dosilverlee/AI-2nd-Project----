import { Router } from "express";
const {
  createReview,
  getMyReview,
  getUserReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Review management
 */

const reviewAuthRouter = Router();

/**
 * @swagger
 * /reviews/register:
 *  post:
 *    tags: [Reviews]
 *    summary : Create a new review
 * /reviews/reviewList:
 *  get:
 *    tags: [Reviews]
 *    summary : Get reviews created by the authenticated user
 */

reviewAuthRouter
    .post("/register",createReview)
    .get("/reviewList",getMyReview);

/**
 * @swagger
 * /reviews/{userId}:  
 *  get:
 *    tags: [Reviews]
 *    summary : Get reviews created by the authenticated user
 */

reviewAuthRouter.route("/:userId").get(getUserReview);

/**
 * @swagger
 * /reviews/{reviewId}:
 *  put:
 *    tags: [Reviews]
 *    summary: Update a review by review ID
 * 
 *  delete:
 *    tags: [Reviews]
 *    summary: Delete a review by review ID
 */

reviewAuthRouter
    .route("/:reviewId")
    .put(updateReview)
    .delete(deleteReview);

export default reviewAuthRouter;
