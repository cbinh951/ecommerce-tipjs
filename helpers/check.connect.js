'use strict';

const { default: mongoose } = require('mongoose');
const os = require('os');
const process = require('process');
const _SECONDS = 5000;
// Define the User schema.
const countConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log(`Number of connections ${numConnection}`);
};

const checkOverload = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    // example maximum number of connections base on number osf core
    const maxConnection = numCores * 5;

    console.log('Active connections: ', numConnection);
    console.log('Memory usage', memoryUsage / 1024 / 1024, 'MB');

    if (numConnection > maxConnection) {
      console.log('connection overload detected');
    }
  }, _SECONDS);
};
module.exports = {
  countConnect,
  checkOverload,
};
