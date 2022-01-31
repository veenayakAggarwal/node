import { expect } from 'chai';
import { stub } from 'sinon';
import { fetchUser, fetchUserByEmail, insertUser, updateUser, deleteUser, userModel } from '../models/UserModel';

const User = userModel;

const next = (data: any) => { 
    return data;
}

describe('User Model Tests', () => {
    it('Fetch User', async () => {
    
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

        mock.returns({
            errors: {
                messsage: '',
            },
            index: 0

        });

        const errorResult: any = await insertUser(req, {}, next);
        expect(errorResult.message).to.equal('User already exists');

        mock.returns({
            errors: {
                messsage: '',
            }
        });

        const errorResult2: any = await insertUser(req, {}, next);
        expect(errorResult2.message).to.equal('There is some issue in creating this account');

        mock.restore();
        
    });

    it('Update User', async () => {
    
        let mock: any = stub(User, 'updateOne');

        mock.returns({
            email: 'test@gmail.com',
            password: 'pwd'
        });
        
        const req = {
            body: {
                email: 'test@gmail.com',
                password: 'pwd'
            },
            params: {
                key: 'test@gmail.com'
            }
        }
        const result: any = await updateUser(req, {}, () => { });
        expect(result.email).to.equal(req.body.email);
        expect(result.password).to.equal(req.body.password);

        mock.returns({
            errors: {
                messsage: '',
            }
        });

        const errorResult: any = await updateUser(req, {}, next);
        expect(errorResult.message).to.equal('Can not update data.');

        mock.restore();
        
    });

    it('Delete User', async () => {
    
        let mock: any = stub(User, 'deleteOne');

        mock.returns({
            email: 'test@gmail.com',
            password: 'pwd'
        });
        
        const req = {
            body: {
                email: 'test@gmail.com',
                password: 'pwd'
            },
            params: {
                key: 'test@gmail.com'
            }
        }
        const result: any = await deleteUser(req, {}, () => { });
        expect(result.email).to.equal(req.body.email);
        expect(result.password).to.equal(req.body.password);

        mock.returns({
            errors: {
                messsage: '',
            },
            params: {
                key: 'test@gmail.com'
            }
        });

        const errorResult: any = await deleteUser(req, {}, next);
        expect(errorResult.message).to.equal('Can not delete data.');

        mock.restore();
        
    });

    it('Fetch User By Email', async () => {
    
        let mock: any = stub(User, 'findOne');

        mock.returns({
            email: 'test@gmail.com',
            password: 'pwd'
        });
        
        const req = {
            body: {
                email: 'test@gmail.com',
                password: 'pwd'
            },
            params: {
                key: 'test@gmail.com'
            }
        }
        const result: any = await fetchUserByEmail(req, {}, () => { });
        expect(result.email).to.equal(req.body.email);
        expect(result.password).to.equal(req.body.password);

        mock.returns({
            errors: {
                messsage: '',
            }
        });

 
        const errorResult: any = await fetchUserByEmail(req, {}, next);
        expect(errorResult.message).to.equal('Can not fetch data.');

        mock.restore();
        
    });

});


