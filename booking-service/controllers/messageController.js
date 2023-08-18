const amqp = require('amqplib/callback_api');
const { RABBITMQ_URI } = require('../config/rabbitmqConfig');

// Function to request user details by ID
const requestUserDetails = (userId) => {
    const message = {
        userId: userId,
        replyTo: 'user_response_queue'  // This specifies where the response should be sent to
    };

    amqp.connect(RABBITMQ_URI, (error, connection) => {
        if (error) throw error;

        connection.createChannel((error, channel) => {
            if (error) throw error;
            channel.assertQueue('user_request_queue', { durable: false });
            channel.sendToQueue('user_request_queue', Buffer.from(JSON.stringify(message)));
            connection.close();
        });
    });
};

// Function to handle received user details
const handleUserDetailsResponse = (callback) => {
    amqp.connect(RABBITMQ_URI, (error, connection) => {
        if (error) throw error;

        connection.createChannel((error, channel) => {
            if (error) throw error;

            channel.assertQueue('user_response_queue', { durable: false });
            
            // Listen to the response queue
            channel.consume('user_response_queue', (msg) => {
                const userDetails = JSON.parse(msg.content.toString());
                
                callback(userDetails);  // Pass the received user details to the provided callback function

                channel.ack(msg);  // Acknowledge receipt of the message
            });
        });
    });
};

module.exports = {
    requestUserDetails,
    handleUserDetailsResponse
};
