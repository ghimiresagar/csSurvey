let express = require('express');
let router = express.Router();

// require control models
let user_controller = require('../controllers/userController');

/* url - /users 
   everything is under this url as other's can only do surveys
*/

router.get('/', user_controller.index);

router.post('/', user_controller.authenticate);

router.get('/surveys', user_controller.list_surveys);

//--------------------- SURVEY URL ----------------------------
// get's the url object's id to display on url
router.get('/surveys/senior/url', user_controller.survey_url_get);
// create a new url for senior survey
router.post('/surveys/senior/url/create', user_controller.senior_url_create_post);
// delete url for senior survey
router.post('/surveys/senior/url/delete', user_controller.senior_url_delete_post);
// check if the url exist
router.get('/surveys/senior/url/:id', user_controller.senior_url_check_get);


// get's the url object's id to display on url
router.get('/surveys/alumni/url', user_controller.alumni_url_get);
// create a new url for alumni survey
router.post('/surveys/alumni/url/create', user_controller.alumni_url_create_post);
// delete url for alumni survey
router.post('/surveys/alumni/url/delete', user_controller.alumni_url_delete_post);

// get's the url object's id to display on url
router.get('/surveys/iba/url', user_controller.iba_url_get);
// create a new url for iba survey
router.post('/surveys/iba/url/create', user_controller.iba_url_create_post);
// delete url for iba survey
router.post('/surveys/iba/url/delete', user_controller.iba_url_delete_post);

//--------------------- SENIOR SURVEY ----------------------------
router.get('/surveys/senior', user_controller.senior_survey_get);

// create senior survey
router.get('/surveys/senior/create', user_controller.senior_create_get);
router.post('/surveys/senior/create', user_controller.senior_create_post);

// update senior survey
router.get('/surveys/senior/edit', user_controller.senior_update_get);
router.post('/surveys/senior/edit', user_controller.senior_update_post);

//delete senior survey
router.get('/surveys/senior/delete', user_controller.senior_delete_get);
router.post('/surveys/senior/delete', user_controller.senior_delete_post);

router.get('/senior/:id', user_controller.senior_detail_get);

//--------------------- ALUMNI SURVEY ----------------------------
router.get('/surveys/alumni', user_controller.alumni_survey_get);

router.get('/surveys/alumni/create', user_controller.alumni_create_get);
router.post('/surveys/alumni/create', user_controller.alumni_create_post);

router.get('/surveys/alumni/edit', user_controller.alumni_update_get);
router.post('/surveys/alumni/edit', user_controller.alumni_update_post);

router.get('/surveys/alumni/delete', user_controller.alumni_delete_get);
router.post('/surveys/alumni/delete', user_controller.alumni_delete_post);

router.get('/alumni/:id', user_controller.alumni_detail_get);

//--------------------- IBA SURVEY ----------------------------
router.get('/surveys/iba', user_controller.iba_survey_get);

router.get('/surveys/iba/create', user_controller.iba_create_get);
router.post('/surveys/iba/create', user_controller.iba_create_post);

router.get('/surveys/iba/edit', user_controller.iba_update_get);
router.post('/surveys/iba/edit', user_controller.iba_update_post);

router.get('/surveys/iba/delete', user_controller.iba_delete_get);
router.post('/surveys/iba/delete', user_controller.iba_delete_post);

router.get('/iba/:id', user_controller.iba_detail_get);


module.exports = router;