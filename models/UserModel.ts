import { NextFunction, Request, Response } from 'express';
import { Schema, model, Date } from 'mongoose';

interface User {
    email: string;
    password?: string;
    lastLogin: Date;
    token: string
}
  
const userSchema = new Schema<User>({

    email:  { 
        type: String, 
        index: true, 
        unique: true,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    lastLogin : {
        type : Date,
        default: Date.now()
    },
    token: {
        type : String
    }

});

export const userModel = model<User>('users', userSchema);

export const insertUser =  (req:any, res:Response, next:NextFunction) => {
    const data = { email: req.body.email, password: req.body.password };
    const userData = new userModel(data);

    return userData.save()
        .then(result => result)
        .catch(err => {
            const error = new Error(err);
            error.message = "There is some issue in creating this account";
                
            if (err.index === 0) { 
                error.message = "User already exists";
            }                        
            return next(error);
        });

}
    
export const fetchUser = () => {
    return userModel.find({})
        .then(data => data)       
        .catch(err => err)
}
    
export const fetchUserByEmail = (req:Request ,res:Response, next:NextFunction) => {
    return userModel.find({ email: req.params.key })
        .then(result => result)       
        .catch(err => {
            return next(Error(err));
        });
}
    
export const updateUser = (req:Request, res:Response, next:NextFunction) => {
    const data = { email: req.body.email, password: req.body.password };                
    const filter = { email: req.params.key };
    
    return userModel.updateOne(filter, data)
        .then(result => result)       
        .catch(err => {
            return next(Error(err));
        });
}
    
export const deleteUser = (req:Request, res:Response, next:NextFunction) => {
    return userModel.deleteOne({ email: req.params.key })
        .then(data => data)       
        .catch(err => {
            return next(Error(err));
        });
}    
