import validator from 'validator';
import * as userModel from '../models/UserModel';
import bcrypt from 'bcryptjs';
import  * as jwt from 'jsonwebtoken';

const User = userModel.userModel;

interface Token {     
    userId: string,
    email: string,
    iat: string,
    exp: string
      
}
export const getUsers = async () => {
    return User.find({});    
}

export const createUser = async ({ userInput }, req) => {

    const { email, password } = userInput;

    if (!validator.isEmail(email)) {
        throw new Error("Email is invalid.");
    }

    const result = await User.findOne({ email });

    if (result) {
        throw new Error("User already exists.");
    }
    const hashedValue = await hashPassword(password);
    const user = new User({ email, password: hashedValue });
            
    return user.save();

}

export const login = async ({ userInput }, req) => {

    const { email, password } = userInput;

    if (!validator.isEmail(email)) {
        throw new Error("Email is invalid.");
    }

    const result = await User.findOne({ email });

    if (!result) {
        throw new Error("User does not exist.");            
    }
    const valid = await compareHash(password, result.password);

    if (!valid) { 
        throw new Error("You have entered wrong password.");
    }
    return {
        userId: result._id.toString(),
        token: createToken(result._id.toString(), result.email)
    
    }
     
}

export const validateToken = ({ userInput }, req) => { 
    const { token, userId } = userInput;
    return {
        isValid: compareToken(userId, token)
    } 

} 

export const createToken = (userId:string, email: string) => { 
    return jwt.sign({
        userId: userId,
        email: email
    }, 'veenayakAggarwal1998',
        {
            expiresIn: '1h'
        }
    )
}   

const compareToken = (userId:string, token: string) => { 
    const decoded: any = jwt.verify(token, 'veenayakAggarwal1998');
    if (decoded.userId === userId.toString()) { 
        return true;
    }
    return false;
}   

export const hashPassword = (password:string) => { 
    return bcrypt.hash(password, 12);
}

export const compareHash = (inputPassword:string, realPassword:string) => { 
    return bcrypt.compare(inputPassword, realPassword)
}