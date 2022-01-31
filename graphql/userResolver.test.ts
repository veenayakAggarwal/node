import { expect } from 'chai';
import {  createUser, getUsers, login, validateToken } from './userResolver';
import { stub, mock } from 'sinon';
import * as userModel from '../models/UserModel';
import { createToken, hashPassword } from '../helper';

const User = userModel.userModel;

const invalidData = {
    _id: 'id',
    email: 'email',
    password: 'pwd'
}

const validData = {
    _id: 'id',
    email: 'test@gmail.com',
    password: 'pwd'
}

const wrongPwd = {
    _id: 'id',
    email: 'test@gmail.com',
    password: 'pw'
}

describe('User Resolver Tests', () => { 
    it('getUsers', async () => {
    
        let mock:any = stub(User, 'find');
        mock.returns({
            ...validData
        });
    
        const result:any = await getUsers();
    
        expect(result.email).to.equal(validData.email);    
        expect(result.password).to.equal(validData.password);   
        
        mock.restore();

    });

    it('createUser', async () => {
    
        let mockFind: any = stub(User, 'findOne');
        let mockSave: any = stub(User.prototype, 'save');

        mockFind.throws();

        mockFind.returns({
            ...validData
        }); 
        
        mockSave.returns({
            ...validData
        });   

        let result: any = createUser({ userInput: invalidData }, 'sdf')
            .catch(err => {
                expect(err.message).to.equal('Email is invalid.');    
            });


        result = createUser({ userInput: validData }, 'sdf')
            .catch(err => {
                expect(err.message).to.equal('User already exists.');
            });        
        
        mockFind.returns(false);  

        result = await createUser({ userInput: validData }, 'sdf');

        expect(result.email).to.equal(validData.email);
        expect(result.password).to.equal(validData.password);
      
        mockFind.restore();
        mockSave.restore();
        
    });

    it('login', async () => {
    
        const hashedPwd = await hashPassword(validData.password);        

        validData.password = hashedPwd;

        let mockFind: any = stub(User, 'findOne');

        mockFind.throws();

        mockFind.returns(false); 
        
        login({ userInput: invalidData }, 'sdf')
            .catch(err => {
                expect(err.message).to.equal('Email is invalid.');    
            });

        login({ userInput: validData }, 'sdf')
            .catch(err => {
                expect(err.message).to.equal('User does not exist.');    
            });
        
        mockFind.returns({
            ...validData
        }); 

        login({ userInput: wrongPwd }, 'sdf')
            .catch(err => {
                expect(err.message).to.equal('You have entered wrong password.');
            });
        
        validData.password = 'pwd';

        const result = await login({ userInput: validData }, 'sdf');
        const token = createToken(validData._id, validData.email);

        expect(result.token).to.equal(token);
        expect(result.userId).to.equal(validData._id);

        mockFind.restore();
        
    });

    it('validateUser', async () => {
        const token = createToken(validData._id, validData.email);
        const data = {
            token,
            userId: validData._id
        }

        const invalidData = {
            token,
            userId: 'a'
        }

        const validResult = validateToken({ userInput: data }, 'sdf');
        expect(validResult.isValid).to.equal(true);

        // const invalidResult = validateToken({ userInput: invalidData }, 'sdf');
        // expect(invalidResult.isValid).to.equal(false);

    });


})


