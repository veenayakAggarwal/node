const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController.ts');

router.get('/users', userController.getUser);
router.get('/users/:key', userController.getUserByKey);
router.post('/users', userController.postUser);
router.put('/users/:key', userController.putUser);
router.delete('/users/:key', userController.deleteUser);

module.exports = router;