const express = require('express');
const userController = require('../controllers/usersController');
const router = express.Router();

router.get('/:customerId', userController.getCustomer);
router.post('/login', userController.login);
router.post('/register', userController.register);
router.patch('/:customerId', userController.updateCustomer);

module.exports = router;