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

//--------------------- SENIOR SURVEY ----------------------------
router.get('/surveys/senior', user_controller.senior_survey_get);

// create senior survey
router.get('/senior/create', user_controller.senior_create_get);
router.post('/senior/create', user_controller.senior_create_post);

// update senior survey
router.get('/surveys/senior/edit', user_controller.senior_update_get);
router.post('/surveys/senior/edit', user_controller.senior_update_post);

//delete senior survey
router.get('/senior/:id/delete', user_controller.senior_delete_get);
router.post('/senior/:id/delete', user_controller.senior_delete_post);

router.get('/senior/:id', user_controller.senior_detail_get);

//--------------------- ALUMNI SURVEY ----------------------------
router.get('/surveys/alumni', user_controller.alumni_survey_get);

router.get('/alumni/create', user_controller.alumni_create_get);
router.post('/alumni/create', user_controller.alumni_create_post);

router.get('/alumni/:id/update', user_controller.alumni_update_get);
router.post('/alumni/:id/update', user_controller.alumni_update_post);

router.get('/alumni/:id/delete', user_controller.alumni_delete_get);
router.post('/alumni/:id/delete', user_controller.alumni_delete_post);

router.get('/alumni/:id', user_controller.alumni_detail_get);

//--------------------- IBA SURVEY ----------------------------
router.get('/surveys/iba', user_controller.iba_survey_get);

router.get('/iba/create', user_controller.iba_create_get);
router.post('surveys/iba/create', user_controller.iba_create_post);

router.get('/iba/:id/update', user_controller.iba_update_get);
router.post('/iba/:id/update', user_controller.iba_update_post);

router.get('/iba/:id/delete', user_controller.iba_delete_get);
router.post('/iba/:id/delete', user_controller.iba_delete_post);

router.get('/iba/:id', user_controller.iba_detail_get);


module.exports = router;