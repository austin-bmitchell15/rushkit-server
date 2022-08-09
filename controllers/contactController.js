import mongoose from "mongoose";
import ContactModel from "../models/contactModel.js";

export const getContacts = async (req, res) => {
    const { page } = req.query;
    try {
        const LIMIT = 8;
        const startingContact = (Number(page) - 1) * LIMIT;
        const totalContacts = await ContactModel.countDocuments({});

        const contacts = await ContactModel.find().sort({ _id: -1 }).limit(LIMIT).skip(startingContact);

        res.status(200).json({ contacts: contacts, currentPage: Number(page), numberOfPages: Math.ceil(totalContacts / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};

export const getContact = async (req, res) => {
    const { id } = req.params;
    try {
        const parsedId = new mongoose.Types.ObjectId(id);
        const contact = await ContactModel.findById(parsedId);

        res.status(200).json(contact);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};

export const getContactsBySearch = async (req, res) => {
    const { searchQuery } = req.query;
    console.log(req.query);
    try {
        const name = new RegExp(searchQuery, 'i');

        const contacts = await ContactModel.find({name: name});

        res.json({ contacts: contacts });
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};

export const createContact = async (req, res) => {
    const contact = req.body;

    const newContactModel = new ContactModel({ ...contact, creatorUserId: req.userId, createdAt: new Date().toISOString()});

    try {
        await newContactModel.save();
        res.status(201).json(newContactModel);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
};

export const updateContact = async (req, res) => {
    const { id } = req.params;
    const contact = req.body;
    const parsedId = new mongoose.Types.ObjectId(id);

    if (!mongoose.Types.ObjectId.isValid(parsedId)) return res.status(404).send('No contact with that id');

    const updatedContact = await ContactModel.findByIdAndUpdate((parsedId), {...contact, parsedId}, { new: true });

    res.json(updatedContact);
};

export const deleteContact = async (req, res) => {
    const { id } = req.params;

    const parsedId = new mongoose.Types.ObjectId(id);

    if (!mongoose.Types.ObjectId.isValid(parsedId)) return res.status(404).send('No contact with that id');

    await ContactModel.findByIdAndDelete(parsedId);
    
    res.json({message: 'Contact Deleted successfully'});
};

export const hotContact = async (req, res) => {
    const { id } = req.params;

    const parsedId = new mongoose.Types.ObjectId(id);

    if (!mongoose.Types.ObjectId.isValid(parsedId)) return res.status(404).send('No contact with that id');

    const contact = await ContactModel.findById(parsedId);
    const updatedContact = await ContactModel.findByIdAndUpdate(parsedId, { isHot: contact.isHot ? false : true }, { new: true});

    res.json(updatedContact);
};