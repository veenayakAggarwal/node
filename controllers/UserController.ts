import * as userModel from '../models/UserModel';
import { NextFunction, Request, Response } from 'express';


export const getUser = (req:Request, res:Response, next:NextFunction) => {
    userModel.fetchUser()
        .then(data => {
            res.send(data);            
        });
}

export const getUserByKey = (req:Request, res:Response,next:NextFunction) => {
    userModel.fetchUserByEmail(req, res, next)
        .then(data => {
            res.send(data);            
        });
}

export const postUser = (req:Request, res:Response, next:NextFunction) => {
    userModel.insertUser(req, res, next)
        .then(data => {
            res.send(data);            
        });
}

export const putUser = (req:Request, res:Response, next:NextFunction) => {
    userModel.updateUser(req, res, next)
        .then(data => {
            res.send(data);            
        });
}

export const deleteUser = (req:Request, res:Response, next:NextFunction) => {
    userModel.deleteUser(req, res, next)
        .then(data => {
            res.send(data);            
        });
}
