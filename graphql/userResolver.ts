import validator from 'validator';
import * as userModel from '../models/UserModel';

const User = userModel.userModel;

export const getUsers = async () => {
    const result = await User.find({});
    return result;
}

export const createUser = async ({ userInput }, req) => { 

    const errors = [];
    const { email, password } = userInput;

    if (!validator.isEmail(email)) { 
        throw new Error("Email is invalid");
    }

    const data = { email: email, password: password };    

    const userExists = await User.findOne({ email: email });

    if (userExists) { 
        throw new Error("User already exists");
    }

    const user = new User(data);
    const result = await user.save();    

    return result;

}