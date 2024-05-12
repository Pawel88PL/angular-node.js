import express from 'express';
import {
    getUser,
    loginUser,
    registerUser,
    updateUser
} from '../controllers/userController.js';

const router = express.Router();

router.get('/:customerId', getUser);
router.post('/login', loginUser);
router.post('/register', registerUser);
router.patch('/:customerId', updateUser);

export default router;
