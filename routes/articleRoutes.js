const express = require('express');
const router = express.Router();
const articleController = require('../controller/articleController');

router.post('/',articleController.article_insert);

router.get('/get-three',articleController.article_get_three);
router.get('/:id',articleController.article_get_single);
module.exports = router;