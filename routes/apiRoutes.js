const express = require('express');
const router = express.Router();
const apiController = require('../controller/apiController');
router.post('/upload',apiController.api_upload_image);
module.exports = router;