const amqp = require('amqplib/callback_api');
const { RABBITMQ_URI } = require('../config/rabbitmqConfig');

const handleReceivedUserDetails = (callback) => {
    amqp.connect(RABBITMQ_URI, (error, connection) => {
        if (error) throw error;

        connection.createChannel((error, channel) => {
            if (error) throw error;

            channel.assertQueue('user_response_queue', { durable: false });
            
            // Listen to the response queue
            channel.consume('user_response_queue', (msg) => {
                const userDetails = JSON.parse(msg.content.toString());
                
                callback(userDetails);  // Process the received user details

                channel.ack(msg);  // Acknowledge receipt of the message
            });
        });
    });
};

module.exports = {
    handleReceivedUserDetails
};
