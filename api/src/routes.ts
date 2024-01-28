import { Router } from 'express';
import isAuthenticated from './app/middlewares/isAuthenticated';
import ContactController from '../src/app/controllers/ContactController';
import CategoryController from '../src/app/controllers/CategoryController';
import UploadController from '../src/app/controllers/UploadController';
import UsersController from './app/controllers/UsersController';
import PostController from './app/controllers/PostController';

const router = Router();

router.post('/signup', UsersController.signUp);
router.post('/signin', UsersController.signIn);
router.post('/signout', UsersController.signOut);


router.get('/contacts', isAuthenticated,  ContactController.index);
router.get('/contacts/:id', isAuthenticated, ContactController.show);
router.delete('/contacts/:id', isAuthenticated, ContactController.delete);
router.post('/contacts/', isAuthenticated, ContactController.store);
router.put('/contacts/:id', isAuthenticated, ContactController.update);

router.get('/categories', isAuthenticated, CategoryController.index);
router.get('/categories/:id', isAuthenticated, CategoryController.show);
router.delete('/categories/:id', isAuthenticated, CategoryController.delete);
router.post('/categories', isAuthenticated, CategoryController.store);
router.put('/categories/:id', isAuthenticated, CategoryController.update);

router.post('/upload', isAuthenticated, UploadController.execute);

router.get('/posts', isAuthenticated,  PostController.findAllPostsByContactsId);
router.post('/posts/', isAuthenticated,  PostController.createNewPost);

export default router;
