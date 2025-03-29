import Message from '../models/message.model.js';

export const sendMessage = async (req, res) => {
    try {
        const {content, receiverId} = req.body;

        const newMessage = await Message.create({
            sender: req.user._id,
            receiver: receiverId,
            content
        });

        // TODO: SEND MESSAGE TO RECEIVER USING SOCKET.IO
        // ...

        res.status(201).json({
            message: 'Message sent successfully',
            data: newMessage
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getConversation = async (req, res) => {
    const { userId } = req.params;
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user._id, receiver: userId },
                { sender: userId, receiver: req.user._id }
            ]
        }).sort({ "createdAt": -1 });

        res.status(200).json({
            message: 'Conversation retrieved successfully',
            data: messages
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}