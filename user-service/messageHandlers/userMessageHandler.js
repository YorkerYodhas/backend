const amqp = require('amqplib/callback_api');
const { RABBITMQ_URI } = require('../config/rabbitmqConfig');

const consumeUserDetailsMessage = (queue, callback) => {
    amqp.connect(RABBITMQ_URI, (error, connection) => {
        if (error) throw error;

        connection.createChannel((error, channel) => {
            if (error) throw error;
            channel.assertQueue(queue, { durable: false });
            
            console.log(`[x] Waiting for messages in ${queue}. To exit press CTRL+C`);

            channel.consume(queue, (message) => {
                const parsedMessage = JSON.parse(message.content.toString());
                callback(parsedMessage);
            }, {
                noAck: true
            });
        });
    });
};

module.exports = {
    consumeUserDetailsMessage
};
