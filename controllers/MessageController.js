const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  try {
    const { recipient, content } = req.body;
    if (!recipient || !content) {
      return res.status(400).json({ message: 'Recipient and content are required' });
    }

    const message = new Message({
      sender: req.user.userId,
      recipient,
      content,
      timestamp: new Date()
    });

    await message.save();
    res.status(201).json({ message: 'Message sent', data: message

