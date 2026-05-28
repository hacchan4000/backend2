import channel from './src/utils/rabbitmq.js';

await channel.assertQueue('applications');

channel.consume('applications', async (message) => {
  const data = JSON.parse(message.content.toString());

  console.log(data);

  channel.ack(message);
});