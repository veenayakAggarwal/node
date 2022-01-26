import { NextFunction, Request, Response } from 'express';
import { Schema, model, Date } from 'mongoose';

interface User {
    email: string;
    password?: string;
    lastLogin: Date
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
    }

});

export const userModel = model<User>('users', userSchema);

export const insertUser =  (req:any, res:Response, next:NextFunction) => {
    const data = { email: req.body.email, password: req.body.password };
    const userData = new userModel(data);

    const result = userData.save()
        .then(data => data)
        .catch(err => {
            const error = new Error(err);
            error.message = "There is some issue in creating this account";
                
            if (err.index === 0) { 
                error.message = "User already exists";
            }                        
            return next(error);
        });

    return result;

}
    
export const fetchUser = () => {
    const result = userModel.find({})
        .then(data => data)       
        .catch(err => err)
    return result;
}
    
export const fetchUserByEmail = (req:Request ,res:Response, next:NextFunction) => {
    const result = userModel.find({ email: req.params.key })
        .then(data => data)       
        .catch(err => {
            return next(Error(err));
        });
    return result;
}
    
export const updateUser = (req:Request, res:Response, next:NextFunction) => {
    const data = { email: req.body.email, password: req.body.password };                
    const filter = { email: req.params.key };
    
    const result = userModel.updateOne(filter, data)
        .then(data => data)       
        .catch(err => {
            return next(Error(err));
        });
    return result;        
}
    
export const deleteUser = (req:Request, res:Response, next:NextFunction) => {
    const result = userModel.deleteOne({ email: req.params.key })
        .then(data => data)       
        .catch(err => {
            return next(Error(err));
        });
    return result;        

}    
