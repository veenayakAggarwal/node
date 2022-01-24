const userModel = require('../models/UserModel.ts');

module.exports = {
    getUsers: () => {
        const result = userModel.fetchUser()
            .then(data => {
                return data;
            });
        
        return result;
    }
} 