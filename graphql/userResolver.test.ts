import { expect } from 'chai';
import { createUser, getUsers, validateToken } from './userResolver';
import { stub } from 'sinon';
import * as userModel from '../models/UserModel';

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

    // it('validateUser', async () => {
    
    //     const validInput = {
    //         token: 'token',
    //         userId: 'test'
    //     };

    //     let result: any = validateToken({ userInput: validInput }, 'sdf');


        
    // });


})


