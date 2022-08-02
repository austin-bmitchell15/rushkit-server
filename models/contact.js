import mongoose from 'mongoose';

const contactSchema = mongoose.Schema({
    email: String,
    message: String,
    name: String,
    phone: String,
    selectedFile: String,
    isHot: Boolean,
    createdAt: {
        type: Date,
        degault: new Date()
    }
});

const ContactModel = mongoose.model('Contact', contactSchema);

export default ContactModel;