const express = require('express');
const { register, login } = require('../controllers/authController');
const validateSchema = require('../middleware/validateMiddleware');
const Joi = require('joi');

const router = express.Router();

const userSchema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required()
});

router.post('/register', validateSchema(userSchema), register);
router.post('/login', validateSchema(userSchema), login);

module.exports = router;
