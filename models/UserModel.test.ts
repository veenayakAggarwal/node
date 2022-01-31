import { expect } from 'chai';
import { stub } from 'sinon';
import { fetchUser, fetchUserByEmail, insertUser, updateUser, deleteUser, userModel } from '../models/UserModel';

const User = userModel;

describe('User Model Tests', () => {
    it('Fetch Users', async () => {
    
        let mock: any = stub(User, 'find');
        
        mock.returns({
            email: 'email',
            password: 'pwd'
        });
    
        const result: any = await fetchUser();
    
        expect(result.email).to.equal('email');
        expect(result.password).to.equal('pwd');

        mock.restore();

    });

    it('Insert User', async () => {
    
        let mock: any = stub(User.prototype, 'save');

        mock.returns({
            email: 'test@gmail.com',
            password: 'pwd'
        });
        
        const req = {
            body: {
                email: 'test@gmail.com',
                password: 'pwd'
            }
        }
    
        const result: any = await insertUser(req, {}, () => { });
    
        expect(result.email).to.equal(req.body.email);
        expect(result.password).to.equal(req.body.password);

        mock.restore();
        
    });

});


