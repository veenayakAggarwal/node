const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController.ts');

router.get('/users', userController.getUser);
router.post('/users', userController.postUser);
router.put('/users', userController.putUser);
router.delete('/users', userController.deleteUser);

module.exports = router;