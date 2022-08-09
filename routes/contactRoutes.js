import express from 'express';

import { getContacts, getContact, getContactsBySearch, createContact, updateContact, deleteContact, hotContact } from '../controllers/contactController.js'
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/search', getContactsBySearch);
router.get('/', getContacts);
router.get('/:id', getContact);
router.post('/', auth, createContact);
router.patch('/:id', auth, updateContact);
router.delete('/:id', auth, deleteContact);
router.patch('/:id/hotContact', auth, hotContact);

export default router;