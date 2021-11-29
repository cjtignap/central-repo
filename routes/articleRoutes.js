const express = require('express');
const router = express.Router();
const articleController = require('../controller/articleController');

router.post('/',articleController.article_insert);

router.get('/get-three',articleController.article_get_three);
router.get('/page/:page',articleController.article_paginate);
router.get('/author/:author',articleController.article_get_by_author);
router.delete('/:id',articleController.article_delete)
router.get('/:id',articleController.article_get_single);

module.exports = router;