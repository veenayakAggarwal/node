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
    const result = await User.find({});
    return result;
}

export const createUser = async ({ userInput }, req) => {

    const { email, password } = userInput;

    if (!validator.isEmail(email)) {
        throw new Error("Email is invalid.");
    }

    const result = User.findOne({ email })
        .then(data => {
            if (data) {
                throw new Error("User already exists.");
            }
            return hashPassword(password)
                .then(password => {
                    const data = { email, password };
                    const user = new User(data);
                    return user.save();
                });;
        });        

    return result;

}

export const login = async ({ userInput }, req) => {

    const { email, password } = userInput;

    if (!validator.isEmail(email)) {
        throw new Error("Email is invalid.");
    }

    const result = User.findOne({ email })
        .then(data => {
            if (!data) {
                throw new Error("User does not exist.");            
            }
            return compareHash(password, data.password)
                .then(valid => {
                    if (!valid) { 
                        throw new Error("You have entered wrong password.");
                    }
                    req.ses
                    return {
                        userId: data._id.toString(),
                        token: createToken(data._id, data.email)
                    }
                });;
        });        

    return result;

}

export const validateToken = ({ userInput }, req) => { 
    const { token, userId } = userInput;
    return {
        isValid: compareToken(userId, token)
    } 

} 

const createToken = (id:Object, email: string) => { 
    return jwt.sign({
        userId: id.toString(),
        email: email
    }, 'veenayakAggarwal1998',
        {
            expiresIn: '1h'
        }
    )
}   

const compareToken = (userId:Object, token: string) => { 
    const decoded: any = jwt.verify(token, 'veenayakAggarwal1998');
    if (decoded.userId === userId.toString()) { 
        return true;
    }
    return false;
}   

const hashPassword = (password:string) => { 
    return bcrypt.hash(password, 12);
}

const compareHash = (inputPassword:string, realPassword:string) => { 
    return bcrypt.compare(inputPassword, realPassword)
}