const express = require('express');
const userControllers = require('../controllers/user');
const router = express.Router();

router.post('/', userControllers.addUserDetails);

module.exports = router;