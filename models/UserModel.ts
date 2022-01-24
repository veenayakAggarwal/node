const db = require('../db.ts');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email:  { 
        type: String, 
        index: true, 
        unique: true,
        required: "Oops..email is required what are you doing?"
    },
    password: {
        type: String, 
        required: "Oops..password is required what are you doing?"
    },
    lastLogin : {
        type : Date,
        default: Date.now()
    }

});

const userTable = mongoose.model('users', userSchema);

// exports.insertUser = (req, res) => {
//     const data = { email: req.query.email, password: req.query.password };                
//     const userData = new userTable(data);

//     userData.save(err => {
//         res.send(
//             {
//                 message: err,
//             }
//         );
//     });

// }

exports.fetchUser = (req, res) => {
    userTable.find({}, (err, data) => {
        res.send(data);
    });    
}

// exports.updateUser = (req, res) => {
//     const data = { email: req.query.email, password: req.query.password };                
//     const userData = new userTable(data);

//     userData.save(err => {
//         res.send(
//             {
//                 message: err,
//             }
//         );
//     });

// }

// exports.deleteUser = (req, res) => {
//     userData.deleteOne();
// }


