const express = require('express');
const { handlegenerateNewShortUrl, handleAnalytics } = require('../controllers/url');

const router = express.Router()

router.post('/', handlegenerateNewShortUrl)
router.get('/shorten/:shortId', handleAnalytics)
module.exports = router