import { Router } from 'express';
import ContactController from '../src/app/controllers/ContactController';
import CategoryController from '../src/app/controllers/CategoryController';
import UploadController from '../src/app/controllers/UploadController';

const router = Router();

router.get(
    '/contacts',
    ContactController.index,
);

router.get('/contacts/:id', ContactController.show);
router.delete('/contacts/:id', ContactController.delete);
router.post('/contacts/', ContactController.store);
router.post('/contacts/batch', ContactController.batchStoreContacts);
router.put('/contacts/:id', ContactController.update);

router.get('/categories', CategoryController.index);
router.get('/categories/:id', CategoryController.show);
router.delete('/categories/:id', CategoryController.delete);
router.post('/categories', CategoryController.store);
router.put('/categories/:id', CategoryController.update);

router.post('/upload', UploadController.execute);

export default router;
