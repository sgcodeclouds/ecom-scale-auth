const { connect, StringCodec } = require('nats');

let nc = null;

const initializeNatsConnection = async () => {
  nc = await connect({ servers: process.env.NATS_URL });
}

const getNatsConnection = () => {
  return nc;
}

module.exports = { initializeNatsConnection, getNatsConnection }
