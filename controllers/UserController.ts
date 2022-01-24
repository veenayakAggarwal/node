const userModel = require('../models/UserModel.ts');

module.exports = {
    getUser : (req, res) => {
        userModel.fetchUser()
            .then(data => {
                res.send(data);            
            });
    },

    getUserByKey : (req, res) => {
        userModel.fetchUserByEmail(req, res)
            .then(data => {
                res.send(data);            
            });
    },

    postUser : (req, res) => {
        userModel.insertUser(req, res)
            .then(data => {
                res.send(data);            
            });
    },

    putUser : (req, res) => {
        userModel.updateUser(req, res)
            .then(data => {
                res.send(data);            
            });
    },

    deleteUser : (req, res) => {
        userModel.deleteUser(req, res)
            .then(data => {
                res.send(data);            
            });
    }
}