import mongoose from 'mongoose';

const contactSchema = mongoose.Schema({
    name: String,
    email: String,
    message: String,
    phoneNumber: String,
    selectedFile: String,
    isHot: Boolean,
    createdAt: {
        type: Date,
        default: new Date()
    },
    creatorUserId: String,
    creatorName: String
});

const ContactModel = mongoose.model('Contact', contactSchema);

export default ContactModel;