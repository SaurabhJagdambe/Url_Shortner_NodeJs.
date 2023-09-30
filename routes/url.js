const express = require ('express');
const { handleGenerateNewShortURL ,handleGetanalytics} = require('../controllers/url')
const router = express.Router();

router.post('/',handleGenerateNewShortURL)

router.get('/analytics/:shortId',handleGetanalytics)
module.exports = router;
