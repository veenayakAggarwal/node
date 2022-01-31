import { expect } from 'chai';
import { compareHash, createToken, createUser, getUsers, hashPassword, login, validateToken } from './userResolver';
import { stub, mock } from 'sinon';
import * as userModel from '../models/UserModel';
import  * as jwt from 'jsonwebtoken';

const User = userModel.userModel;


describe('User Tests', () => { 
    it('getUsers', async () => {
    
        let mock:any = stub(User, 'find');
        mock.returns({
            email: 'email',
            password: 'pwd'
        });
    
        const result:any = await getUsers();
    
        expect(result.email).to.equal('email');    
        expect(result.password).to.equal('pwd');    
    });

    it('createUser', async () => {
    
        let mockFind: any = stub(User, 'findOne');
        let mockSave: any = stub(User.prototype, 'save');

        mockFind.throws();

        mockFind.returns({
            email: 'test@gmail.com',
            password: 'pwd'
        }); 
        
        mockSave.returns({
            email: 'test@gmail.com',
            password: 'pwd'
        });   

        const invalidInput = {
            email: 'test',
            password: 'pwd'
        };

        const validInput = {
            email: 'test@gmail.com',
            password: 'pwd'
        };

        let result: any = createUser({ userInput: invalidInput }, 'sdf')
            .catch(err => {
                expect(err.message).to.equal('Email is invalid.');    
            });


        result = createUser({ userInput: validInput }, 'sdf')
            .catch(err => {
                expect(err.message).to.equal('User already exists.');
            });        
        
        mockFind.returns(false);  

        result = await createUser({ userInput: validInput }, 'sdf');

        expect(result.email).to.equal('test@gmail.com');
        expect(result.password).to.equal('pwd');
      
        mockFind.restore();
        
    });

    it('login', async () => {
    
        let mockFind: any = stub(User, 'findOne');

        mockFind.throws();

        mockFind.returns(false); 
        const hashedPwd = await hashPassword('pwd');

        const invalidInput = {
            email: 'test',
            password: 'pwd'
        };

        
        const validInput = {
            email: 'test@gmail.com',
            password: 'pwd'
        };

        login({ userInput: invalidInput }, 'sdf')
            .catch(err => {
                expect(err.message).to.equal('Email is invalid.');    
            });

        login({ userInput: validInput }, 'sdf')
            .catch(err => {
                expect(err.message).to.equal('User does not exist.');    
            });
        
        const wrongPwd = {
            email: 'test@gmail.com',
            password: 'pw'
        };

        mockFind.returns({
            _id: 'id',
            email: 'test@gmail.com',
            password: hashedPwd
        }); 

        login({ userInput: wrongPwd }, 'sdf')
            .catch(err => {
                expect(err.message).to.equal('You have entered wrong password.');
            });
        
        const result = await login({ userInput: validInput }, 'sdf');
        const token = createToken('id', 'test@gmail.com');

        expect(result.token).to.equal(token);
        expect(result.userId).to.equal('id');

        mockFind.restore();
        
    });

    it('validateUser', async () => {
        const token = createToken('id', 'test@gmail.com');

        const validInput = {
            token: token,
            userId: 'id'
        };

        const invalidInpput = {
            token: token,
            userId: 'i'
        };

        const result = validateToken({ userInput: validInput }, 'sdf');
        expect(result.isValid).to.equal(true);

        const result2 = validateToken({ userInput: invalidInpput }, 'sdf');
        expect(result2.isValid).to.equal(false);

            
    });


})


