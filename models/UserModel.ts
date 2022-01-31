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

    const result: any = await userData.save();
    if (result.errors) {
        const error = new Error(result.errors);
        error.message = "There is some issue in creating this account";
            
        if (result.index === 0) { 
            error.message = "User already exists";
        }                        
        
        return next(error);
    }
        
    return result;
}
    
export const fetchUser = async () => {
    return userModel.find({});
}
    
export const fetchUserByEmail = async (req:any ,res:any, next:any) => {
    const result: any = await userModel.findOne({ email: req.params.key });
    if (result.errors) {
        const error = new Error(result.errors);
        error.message = 'Can not fetch data.' ;
        return next(error);
    }
    return result;
}
    
export const updateUser = async (req:any, res:any, next:any) => {
    const body = { email: req.body.email, password: req.body.password };                
    const filter = { email: req.params.key };
    
    const result: any = await userModel.updateOne(filter, body);
    if (result.errors) {
        const error = new Error(result.errors);
        error.message = 'Can not update data.' ;
        return next(error);
    }
    
    return result;
}
    
export const deleteUser = async (req:any, res:any, next:any) => {
    const result: any = await userModel.deleteOne({ email: req.params.key });
    if (result.errors) {
        const error = new Error(result.errors);
        error.message = 'Can not delete data.' ;
        return next(error);
    }
    return result;
}    
