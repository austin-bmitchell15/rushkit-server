import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

import UserModel from '../models/userModel.js';

dotenv.config();
;;;
export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });

        if (!existingUser) return res.status(404).json({message: 'USER_DOES_NOT_EXIST'});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message: 'INVALID_CREDENTIALS'});


        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.TOKEN_KEY, { expiresIn: '1h' })

        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

export const signup = async (req, res) => {

    const {email, password, confirmPassword, firstName, lastName, secretWord} = req.body;

    try {
        var map = new Map();
        map.set(process.env.ADMIN_SECRET_WORD, "admin");
        map.set(process.env.USER_SECRET_WORD, "user");
        map.set(process.env.DOORMAN_SECRET_WORD, "doorman");


        const existingUser = await UserModel.findOne({ email });

        if (existingUser) return res.status(400).json({message: 'EMAIL_EXISTS'});

        if (password !== confirmPassword) return res.status(400).json({message: 'PASSWORD_DO_NOT_MATCH'});

        if (!map.has(secretWord)) return res.status(400).json({message: 'INVALID_CREDENTIALS'});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserModel.create({email, password: hashedPassword, name: `${firstName} ${lastName}`, role: map.get(secretWord)});
        const token = jwt.sign({email: result.email, id: result._id}, process.env.TOKEN_KEY, {expiresIn: '1h'});

        res.status(200).json({ result, token })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
    
}