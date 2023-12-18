'use strict';

const mongoose = require('mongoose');

const connectString =
  'mongodb+srv://cbinh951:congbinh95@cluster0.i1ggxhq.mongodb.net/';
const { countConnect } = require('../helpers/check.connect');

class Database {
  constructor() {
    this.connect();
  }

  connect(type = 'mongo') {
    if (1 == 1) {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }
    mongoose
      .connect(connectString)
      .then((_) => console.log('connect success', countConnect()))
      .catch((err) => console.log('error connect', err));
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongoDb = Database.getInstance();
module.exports = instanceMongoDb;
