const amqp = require('amqplib')

module.exports = { 
  uri: 'amqp://localhost', 
  options: { 
    credentials: amqp.credentials.plain('my_user', '123456') 
  }
}
