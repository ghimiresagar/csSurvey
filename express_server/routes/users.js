let express = require('express');
let router = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');

// require control models
let user_controller = require('../controllers/userController');

/* url - /users 
   everything is under this url as other's can only do surveys
*/

router.get('/', user_controller.index);

// login
router.post('/', passport.authenticate('local', {session: false}), user_controller.authenticate);
// logout
router.get('/logout', passport.authenticate('jwt', {session: false}), user_controller.logout);
// authentication
router.get('/authenticated', passport.authenticate('jwt', {session: false}), user_controller.authenticated);

// router.get('/surveys', passport.authenticate('jwt', {session: false}), user_controller.list_surveys);

//--------------------- SURVEY URL ----------------------------
// get's the url object's id to display on url
router.get('/surveys/senior/url', passport.authenticate('jwt', {session: false}), user_controller.senior_url_get);
router.post('/surveys/senior/url', passport.authenticate('jwt', {session: false}), user_controller.senior_url_post);
// create a new url for senior survey
router.post('/surveys/senior/url/create', passport.authenticate('jwt', {session: false}), user_controller.senior_url_create_post);
// delete url for senior survey
router.post('/surveys/senior/url/delete/:id', passport.authenticate('jwt', {session: false}), user_controller.senior_url_delete_post);
// check if the url exist, if it does get the questions
router.get('/surveys/senior/url/:id', user_controller.senior_url_check_get);
// sending the request to the server for posting results
router.post('/surveys/senior/url/:id', user_controller.senior_url_check_post);


// get's the url object's id to display on url
router.get('/surveys/alumni/url', passport.authenticate('jwt', {session: false}), user_controller.alumni_url_get);
router.post('/surveys/alumni/url', passport.authenticate('jwt', {session: false}), user_controller.alumni_url_post);

// create a new url for alumni survey
router.post('/surveys/alumni/url/create', passport.authenticate('jwt', {session: false}), user_controller.alumni_url_create_post);
// delete url for alumni survey
router.post('/surveys/alumni/url/delete', passport.authenticate('jwt', {session: false}), user_controller.alumni_url_delete_post);

// get's the url object's id to display on url
router.get('/surveys/iba/url', passport.authenticate('jwt', {session: false}), user_controller.iba_url_get);
router.post('/surveys/iba/url', passport.authenticate('jwt', {session: false}), user_controller.iba_url_post);

// create a new url for iba survey
router.post('/surveys/iba/url/create', passport.authenticate('jwt', {session: false}), user_controller.iba_url_create_post);
// delete url for iba survey
router.post('/surveys/iba/url/delete', passport.authenticate('jwt', {session: false}), user_controller.iba_url_delete_post);

//--------------------- SENIOR SURVEY ----------------------------
router.get('/surveys/senior', passport.authenticate('jwt', {session: false}), user_controller.senior_survey_get);

// create senior survey
// router.get('/surveys/senior/create', passport.authenticate('jwt', {session: false}), user_controller.senior_create_get);
router.post('/surveys/senior/create', passport.authenticate('jwt', {session: false}), user_controller.senior_create_post);

// update senior survey
router.get('/surveys/senior/edit', passport.authenticate('jwt', {session: false}), user_controller.senior_update_get);
router.post('/surveys/senior/edit', passport.authenticate('jwt', {session: false}), user_controller.senior_update_post);

//delete senior survey
router.get('/surveys/senior/delete', passport.authenticate('jwt', {session: false}), user_controller.senior_delete_get);
router.post('/surveys/senior/delete', passport.authenticate('jwt', {session: false}), user_controller.senior_delete_post);

// router.get('/senior/:id', passport.authenticate('jwt', {session: false}), user_controller.senior_detail_get);

//--------------------- ALUMNI SURVEY ----------------------------
router.get('/surveys/alumni', passport.authenticate('jwt', {session: false}), user_controller.alumni_survey_get);

// router.get('/surveys/alumni/create', user_controller.alumni_create_get);
router.post('/surveys/alumni/create', passport.authenticate('jwt', {session: false}), user_controller.alumni_create_post);

router.get('/surveys/alumni/edit', passport.authenticate('jwt', {session: false}), user_controller.alumni_update_get);
router.post('/surveys/alumni/edit', passport.authenticate('jwt', {session: false}), user_controller.alumni_update_post);

router.get('/surveys/alumni/delete', passport.authenticate('jwt', {session: false}), user_controller.alumni_delete_get);
router.post('/surveys/alumni/delete', passport.authenticate('jwt', {session: false}), user_controller.alumni_delete_post);

// router.get('/alumni/:id', user_controller.alumni_detail_get);

//--------------------- IBA SURVEY ----------------------------
router.get('/surveys/iba', passport.authenticate('jwt', {session: false}), user_controller.iba_survey_get);

// router.get('/surveys/iba/create', user_controller.iba_create_get);
router.post('/surveys/iba/create', passport.authenticate('jwt', {session: false}), user_controller.iba_create_post);

router.get('/surveys/iba/edit', passport.authenticate('jwt', {session: false}), user_controller.iba_update_get);
router.post('/surveys/iba/edit', passport.authenticate('jwt', {session: false}), user_controller.iba_update_post);

router.get('/surveys/iba/delete', passport.authenticate('jwt', {session: false}), user_controller.iba_delete_get);
router.post('/surveys/iba/delete', passport.authenticate('jwt', {session: false}), user_controller.iba_delete_post);

// router.get('/iba/:id', user_controller.iba_detail_get);


module.exports = router;