import { expect } from 'chai';
import { stub } from 'sinon';
import { fetchUser, fetchUserByEmail, insertUser, updateUser, deleteUser, userModel } from '../models/UserModel';

const User = userModel;

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

        mock.throws({
            index: 0,
            message: 'Error'
        });
        
        insertUser(req, {}, () => { })
            .catch(err => {
                expect(err.message).to.equal('Error');
            });
    

        mock.restore();
        
    });

    // it('Update User', async () => {
    
    //     let mock: any = stub(User, 'updateOne');

    //     mock.returns({
    //         email: 'test@gmail.com',
    //         password: 'pwd'
    //     });
        
    //     const req = {
    //         body: {
    //             email: 'test@gmail.com',
    //             password: 'pwd'
    //         },
    //         params: {
    //             key: 'test@gmail.com'
    //         }
    //     }
    
    //     const result: any = await updateUser(req, {}, () => { });
    
    //     expect(result.email).to.equal(req.body.email);
    //     expect(result.password).to.equal(req.body.password);

    //     mock.restore();
        
    // });

    // it('Delete User', async () => {
    
    //     let mock: any = stub(User, 'deleteOne');

    //     mock.returns({
    //         email: 'test@gmail.com',
    //         password: 'pwd'
    //     });
        
    //     const req = {
    //         params: {
    //             key: 'test@gmail.com',
    //         }
    //     }
    
    //     const result: any = await deleteUser(req, {}, () => { });
    
    //     expect(result.email).to.equal('test@gmail.com');
    //     expect(result.password).to.equal('pwd');

    //     mock.restore();
        
    // });

    // it('Fetch User By Email', async () => {
    
    //     let mock: any = stub(User, 'find');

    //     mock.returns({
    //         email: 'test@gmail.com',
    //         password: 'pwd'
    //     });
        
    //     const req = {
    //         params: {
    //             key: 'test@gmail.com',
    //         }
    //     }
    
    //     const result: any = await fetchUserByEmail(req, {}, () => { });
    
    //     expect(result.email).to.equal('test@gmail.com');
    //     expect(result.password).to.equal('pwd');

    //     mock.restore();
        
    // });

});


