import mongoose from 'mongoose';
import config from './config';

const url = "mongodb://"+config.database.user+":"+config.database.pwd+"@"+config.database.host+":"+config.database.port+"/zemoso";  

mongoose.connect(url);

const database = mongoose.connection;

database.on('connected', () => {
    console.log('database is connected successfully');
});

database.on('disconnected', () => {
    console.log('database is disconnected successfully');
});

database.on('error', console.error.bind(console, 'connection error:'));

export default database;