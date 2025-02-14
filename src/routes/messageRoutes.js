const express = require('express');
const { sendMessage } = require('../controllers/messageController');
const { authenticateToken } = require('../middleware/authMiddleware');
const validateSchema = require('../middleware/validateMiddleware');
const Joi = require('joi');

const router = express.Router();

const messageSchema = Joi.object({ text: Joi.string().min(1).required() });

router.post('/', authenticateToken, validateSchema(messageSchema), sendMessage);

module.exports = router;
