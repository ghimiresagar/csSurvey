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


module.exports = router;
