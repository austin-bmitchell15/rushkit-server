import express from 'express';
import { getContacts, createContact, updateContact, deleteContact, hotContact } from '../controllers/contactController.js'

const router = express.Router();

router.get('/', getContacts);
router.post('/', createContact);
router.patch('/:id', updateContact);
router.delete('/:id', deleteContact);
router.patch('/:id/hotContact', hotContact);

export default router;