import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userData = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },


},{timestamps:true});

export const usersData = mongoose.model('users', userData)