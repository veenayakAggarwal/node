import * as userModel from '../models/UserModel';

export const getUser = async (req:any, res:any, next:any) => {
    return res.send(await userModel.fetchUser());            
}

export const getUserByKey = async (req:any, res:any,next:any) => {
    return res.send(await userModel.fetchUserByEmail(req, res, next));            

}

export const postUser = async (req:any, res:any, next:any) => {
    return res.send(await userModel.insertUser(req, res, next));            

}

export const putUser = async (req:any, res:any, next:any) => {
    return res.send(await userModel.updateUser(req, res, next));            

}

export const deleteUser = async (req:any, res:any, next:any) => {
    return res.send(await userModel.deleteUser(req, res, next));            
}
