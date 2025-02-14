const { Message } = require('../models');

exports.sendMessage = async (req, res) => {
    const message = await Message.create({ userId: req.user.id, text: req.body.text });
    res.json(message);
};
