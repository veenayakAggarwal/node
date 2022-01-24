const mongoose = require('mongoose');
const config = require('./config.ts');

const url = "mongodb://"+config.database.user+":"+config.database.pwd+"@"+config.database.host+":"+config.database.port+"/zemoso";  

mongoose.connect(url, {useNewUrlParser: true});
const conn = mongoose.connection;

conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected', function () {
    console.log('database is disconnected successfully');
});

conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;