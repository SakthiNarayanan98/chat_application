const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');
const { User } = require('../models');
const responseHelper = require('../utils/responseHelper');

exports.register = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ username: req.body.username, password: hashedPassword });
    return responseHelper.successResponse(res, 'User registered successfully', user);
};

exports.login = async (req, res) => {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        logger.warn(`Failed login attempt for username: ${req.body.username}`);
        return responseHelper.errorResponse(res, 'Invalid credentials', 401);    }

    logger.info(`User logged in: ${user.username}`);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    return responseHelper.successResponse(res, 'Login successful', { token });
};
