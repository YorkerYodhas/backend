const amqp = require('amqplib/callback_api');
const { RABBITMQ_URI } = require('../config/rabbitmqConfig');
const { getUserById } = require('./planetService');  // Import the function from userService

// Sending a message (generic)
const sendMessage = (queue, message) => {
    amqp.connect(RABBITMQ_URI, (error, connection) => {
        if (error) throw error;

        connection.createChannel((error, channel) => {
            if (error) throw error;
            channel.assertQueue(queue, { durable: false });
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
            connection.close(); // Closing connection after sending the message
        });
    });
};

// Sending user details by ID
const sendUserDetailsById = async (queue, userId) => {
    try {
        const user = await getUserById(userId);
        if (user) {
            sendMessage(queue, user);
        } else {
            console.error(`User with ID ${userId} not found`);
        }
    } catch (error) {
        console.error(`Error fetching user by ID: ${error.message}`);
    }
};

module.exports = {
    sendMessage,
    sendUserDetailsById
};
