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

module.exports =  {
    insertUser : (req, res) => {
        const data = { email: req.body.email, password: req.body.password };
        const userData = new userTable(data);
    
        const result = userData.save()
            .then(data => {
                return data;       
            })
            .catch(err => {
                return err;       
            });

        return result;
    
    },
    
    fetchUser : () => {
        const result = userTable.find({})
            .then(data => {
                return data;       
            })
            .catch(err => {
                return err;       
            });
            
        return result;
    },
    
    fetchUserByEmail : (req) => {
        const result = userTable.find({ email: req.params.key })
            .then(data => {
                return data;       
            })
            .catch(err => {
                return err;       
            });

        return result;
    },
    
    updateUser : (req, res) => {
        const data = { email: req.body.email, password: req.body.password };                
        const filter = { email: req.params.key };
        
        const result = userTable.updateOne(filter, data)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.send(err);
            });
        return result;        
    },
    
    deleteUser : (req, res) => {
        const result = userTable.deleteOne({ email: req.params.key })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.send(err);
            });
        return result;        

    }    
}


