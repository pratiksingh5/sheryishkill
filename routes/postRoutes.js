var express = require('express');
var router = express.Router();


const { check } = require('express-validator');

const { 
  homepageRoute,
  profileRoute,
  timelineRoute,
  createpostRoute,
  postlikeRoute,
  postdislikeRoute
} = require('../controller/postControllers');

const  { isLoggedIn } = require('./utility/verifyToken');


/**
 * @route POST /users/posts/
 * @desc Testing Home Route
 * @access Private
 */
router.post('/', isLoggedIn, homepageRoute);

/**
 * @route GET /users/posts/profile
 * @desc User's all details with all recent posts
 * @access Private
 */
router.get('/profile', isLoggedIn, profileRoute);

/**
 * @route GET /users/posts/timeline
 * @desc Show all the recent posts
 * @access Private
 */
router.get('/timeline', isLoggedIn, timelineRoute);


/**
 * @route POST /users/posts/createpost
 * @desc let the user create the posts
 * @access Private
 */
router.post('/createpost', [
  check('postText', 'Post must have atleast 10 characters').isLength({min: 10})
],  isLoggedIn, createpostRoute);


/**
 * @route POST /users/posts/postlike/:id
 * @desc let the user like any post
 * @access Private
 */
router.post('/postlike/:id', isLoggedIn, postlikeRoute);

/**
 * @route POST /users/posts/postdislike/:id
 * @desc let the user dislike any post
 * @access Private
 */
router.post('/postdislike/:id', isLoggedIn, postdislikeRoute);

module.exports = router;
