import { expect } from 'chai';
import { getUsers } from './userResolver';
import { stub } from 'sinon';
import * as userModel from '../models/UserModel';
const User = userModel.userModel;

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