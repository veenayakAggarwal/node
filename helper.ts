import bcrypt from 'bcryptjs';
import  * as jwt from 'jsonwebtoken';
import config from './config';

export const createToken = (userId: string, email: string) => { 
    return jwt.sign({
        userId: userId,
        email: email
    }, config.jwt,
        {
            expiresIn: '1h'
        }
    )
}   

export const compareToken = (userId:string, token: string) => { 
    const decoded: any = jwt.verify(token, config.jwt);
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