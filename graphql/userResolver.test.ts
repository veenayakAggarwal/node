import { expect } from 'chai';
import { createUser, getUsers } from './userResolver';
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

        mockFind.throws();

        mockFind.returns({
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

        let result: any = await createUser({ userInput: invalidInput }, 'sdf')
            .catch(err => {
                expect(err.message).to.equal('Email is invalid.');    
            });


        result = await createUser({ userInput: validInput }, 'sdf')
            .catch(err => {
                expect(err.message).to.equal('User already exists.');
            });

        mockFind.restore();
    });


})
