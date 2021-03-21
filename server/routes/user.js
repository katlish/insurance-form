const express = require('express');
const userControllers = require('../controllers/user');
const isValidUserDetails = require('../middlewares/isValidUserDetails');
const router = express.Router();

router.post('/', isValidUserDetails, userControllers.addUserDetails);

module.exports = router;