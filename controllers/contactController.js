import mongoose from "mongoose";
import ContactModel from "../models/contactModel.js";

export const getContacts = async (req, res) => {
    try {
        const contactModel = await ContactModel.find();

        res.status(200).json(contactModel);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createContact = async (req, res) => {
    const post = req.body;

    const newContactModel = new ContactModel({ ...post, creatorUserId: req.userId, createdAt: new Date().toISOString()});

    try {
        await newContactModel.save();
        res.status(201).json(newContactModel);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updateContact = async (req, res) => {
    const { id } = req.params;
    const contact = req.body;
    const parsedId = new mongoose.Types.ObjectId(id);

    if (!mongoose.Types.ObjectId.isValid(parsedId)) return res.status(404).send('No contact with that id');

    const updatedContact = await ContactModel.findByIdAndUpdate((parsedId), {...contact, parsedId}, { new: true });

    res.json(updatedContact);
}

export const deleteContact = async (req, res) => {
    const { id } = req.params;

    const parsedId = new mongoose.Types.ObjectId(id);

    if (!mongoose.Types.ObjectId.isValid(parsedId)) return res.status(404).send('No contact with that id');

    await ContactModel.findByIdAndDelete(parsedId);
    
    res.json({message: 'Contact Deleted successfully'});
}

export const hotContact = async (req, res) => {
    const { id } = req.params;

    const parsedId = new mongoose.Types.ObjectId(id);

    if (!mongoose.Types.ObjectId.isValid(parsedId)) return res.status(404).send('No contact with that id');

    const contact = await ContactModel.findById(parsedId);
    const updatedContact = await ContactModel.findByIdAndUpdate(parsedId, { isHot: contact.isHot ? false : true }, { new: true});

    res.json(updatedContact);
}