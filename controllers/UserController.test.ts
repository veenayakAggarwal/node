import { expect } from 'chai';
import { stub } from 'sinon';
import * as userModel from '../models/UserModel';
import * as userController from './UserController';

const User = userModel;

describe('User Controller Tests', () => { 
    it('Get User', async () => {
        const res = { 
            send: (data: any) => { 
                return data;
            }
        }
    
        let mock: any = stub(User, 'fetchUser');
        mock.throws();

        mock.returns({
            email: 'email',
            password: 'pwd'
        });
    
        const result: any = await userController.getUser({}, res, () => { });
        
        expect(result.email).to.equal('email');    
        expect(result.password).to.equal('pwd');   
        
        mock.restore();

    });

    it('Get User By Key', async () => {
        const res = { 
            send: (data: any) => { 
                return data;
            }
        }
    
        let mock: any = stub(User, 'fetchUserByEmail');
        mock.throws();

        mock.returns({
            email: 'email',
            password: 'pwd'
        });
    
        const result: any = await userController.getUserByKey({}, res, () => { });
        
        expect(result.email).to.equal('email');    
        expect(result.password).to.equal('pwd');   
        
        mock.restore();
        
    });

    it('Post User', async () => {
        const res = { 
            send: (data: any) => { 
                return data;
            }
        }
    
        let mock: any = stub(User, 'insertUser');
        mock.throws();

        mock.returns({
            email: 'email',
            password: 'pwd'
        });
    
        const result: any = await userController.postUser({}, res, () => { });
        
        expect(result.email).to.equal('email');    
        expect(result.password).to.equal('pwd');   
        
        mock.restore();
        
    });

    it('Put User', async () => {
        const res = { 
            send: (data: any) => { 
                return data;
            }
        }
    
        let mock: any = stub(User, 'updateUser');
        mock.throws();

        mock.returns({
            email: 'email',
            password: 'pwd'
        });
    
        const result: any = await userController.putUser({}, res, () => { });
        
        expect(result.email).to.equal('email');    
        expect(result.password).to.equal('pwd');   
        
        mock.restore();
        
    });

    it('Delete User', async () => {
        const res = { 
            send: (data: any) => { 
                return data;
            }
        }
    
        let mock: any = stub(User, 'deleteUser');
        mock.throws();

        mock.returns({
            email: 'email',
            password: 'pwd'
        });
    
        const result: any = await userController.deleteUser({}, res, () => { });
        
        expect(result.email).to.equal('email');    
        expect(result.password).to.equal('pwd');   
        
        mock.restore();
        
    });

})


