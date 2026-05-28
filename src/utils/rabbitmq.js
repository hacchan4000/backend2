import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

const connection = await amqp.connect({
  hostname: process.env.RABBITMQ_HOST,
  port: process.env.RABBITMQ_PORT,
  username: process.env.RABBITMQ_USER,
  password: process.env.RABBITMQ_PASSWORD,
});

const channel = await connection.createChannel();

export default channel;