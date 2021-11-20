const express = require('express');
const router = express.Router();
const recordController = require('../controller/recordController');


router.post('/search',recordController.record_search);
router.delete('',recordController.record_delete);
router.post('/',recordController.record_insert);
router.get('/:id',recordController.record_get);
module.exports = router;