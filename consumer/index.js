const amqp = require('amqplib')
const { uri, options } = require('../config/')

const assertQueueOptions = { durable: true }
const consumeQueueOptions = { noAck: false }
const queue = 'queue_name'

const assertQueueAndConsume = channel => {
  console.log('Worker is running! Waiting for new messages...')

  const ackMsg = msg => Promise.resolve(msg)
    .then(() => {
      console.log("[x] Received %s", msg.content.toString())
      return msg
    })
    .then(msg => channel.ack(msg))

  return channel.assertQueue(queue, assertQueueOptions)
    .then(() => channel.prefetch(1))
    .then(() => channel.consume(queue, ackMsg, consumeQueueOptions))
}

const createChannel = connection => {
  return connection.createChannel()
    .then(assertQueueAndConsume)
}

const consumer = () => amqp.connect(uri, options).then(createChannel)

module.exports = consumer
