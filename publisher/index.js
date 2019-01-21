const amqp = require('amqplib')
const { uri, options } = require('../config')

const assertQueueOptions = { durable: true }
const sendToQueueOptions = { persistent: true }
const queue = 'queue_name'

const assertQueueAndSend = channel => {
  const bufferData = new Buffer(JSON.stringify({ text: 'Hello, I am test!', tel: 9998888888 }))

  return channel.assertQueue(queue, assertQueueOptions)
    .then(() => channel.sendToQueue(queue, bufferData, sendToQueueOptions))
    .then(() => channel.close())
}

const createChannel = connection => {
  return connection.createChannel()
    .then(assertQueueAndSend)
    .then(() => connection.close())
}

const publisher = () => amqp.connect(uri, options).then(createChannel)

module.exports = publisher
