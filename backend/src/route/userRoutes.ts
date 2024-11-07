import express, {Request, Response} from 'express';
import { getUsers, getUser, deleteUser, createUser, updateUser } from '../controllers/userControllers';

const router = express.Router();

router.get('/', getUsers)

router.get('/:id', getUser)

router.delete('/delete/:id', deleteUser)

router.post('/create', createUser)

router.patch('/update/:id', updateUser)



export const usersRoute = router;

module.exports = {
    usersRoute
}