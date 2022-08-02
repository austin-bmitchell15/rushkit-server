import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    email: String,
    message: String,
    name: String,
    phone: String,
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        degault: new Date()
    }
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;