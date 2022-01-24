const userModel = require('../models/UserModel.ts');

exports.getUser = (req, res) => {
    userModel.fetchUser(req, res);
}

exports.postUser = (req, res) => {
    userModel.insertUser(req, res);
}

exports.putUser = (req, res) => {
    userModel.updateUser(req, res);
}

exports.deleteUser = (req, res) => {
    userModel.deleteUser(req, res);
}