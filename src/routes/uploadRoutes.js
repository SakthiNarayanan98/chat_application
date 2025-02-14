const express = require('express');
const { uploadFiles, uploadMiddleware } = require('../controllers/uploadController');

const router = express.Router();

router.post('/', uploadMiddleware, uploadFiles);

module.exports = router;
