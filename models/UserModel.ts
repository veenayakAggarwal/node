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

export const insertUser = async (req: any, res: any, next: any) => {
    const body = { email: req.body.email, password: req.body.password };
    const userData = new userModel(body);

    return userData.save((err: any, data: any) => { 
        if (err) { 
            const error = new Error(err);
            error.message = "There is some issue in creating this account";
                
            if (err.index === 0) { 
                error.message = "User already exists";
            }                        
            return next(error);
        }
        return data;
    });
}
    
export const fetchUser = async () => {
    return userModel.find({});
}
    
export const fetchUserByEmail = (req:any ,res:any, next:any) => {
    return userModel.find({ email: req.params.key }, (err: any, data: any) => {
        if (err) { 
            const error = new Error(err);
            error.message = 'Can not fetch data.' ;
            return next(err);
        }
        return data;
    });
}
    
export const updateUser = (req:any, res:any, next:any) => {
    const body = { email: req.body.email, password: req.body.password };                
    const filter = { email: req.params.key };
    
    return userModel.updateOne(filter, body, (err: any, data: any) => {
        if (err) { 
            const error = new Error(err);
            error.message = 'Can not update data.' ;
            return next(err);
        }
        return data;
    });
}
    
export const deleteUser = (req:any, res:any, next:any) => {
    return userModel.deleteOne({ email: req.params.key }, (err:any , data: any) => {
        if (err) { 
            const error = new Error(err);
            error.message = 'Can not delete data.' ;
            return next(err);
        }
        return data;
    });
}    
