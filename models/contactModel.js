import mongoose from 'mongoose';

const contactSchema = mongoose.Schema({
    name: String,
    email: String,
    year: String,
    phoneNumber: String,
    interestTags: [String],
    brothersTalkedTo: [String],
    numberOfBrothersTalkedTo: Number,
    brothersReccommended: [String],
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