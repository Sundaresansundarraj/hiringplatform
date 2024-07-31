const amqp = require('amqplib');
let channel, connection;
const ampq = process.env.RABBITMQ


async function connect() {
    try {
        connection = await amqp.connect(ampq);
        channel = await connection.createChannel();
        await channel.assertQueue('Queues',{ durable: false });

    } catch (error) {
        console.error('Error connecting to RabbitMQ', error);
    }
}

async function approvel(userinApplication,email_id,comapnyname,companylocation,jobTitle) {
    try {
        if (!channel) {
            await connect();
        }
        const messageString = JSON.stringify({user_id: userinApplication,email:email_id,comapnyname:comapnyname,companylocation:companylocation,jobTitle:jobTitle});
        channel.sendToQueue('Queues', Buffer.from(messageString));
    } catch (error) {
        console.error('Error sending message to RabbitMQ', error);
    }
}



process.on('exit', () => {
    if (channel) {
        channel.close();
    }
    if (connection) {
        connection.close();
    }
});

module.exports = { connect,approvel };