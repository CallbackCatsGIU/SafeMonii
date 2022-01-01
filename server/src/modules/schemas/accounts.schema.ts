import * as mongoose from 'mongoose';

export const AccountSchema = new mongoose.Schema({
    balance: {
        type: Number,
        default : 100,
        unique: false
    },
    accountNumber: {
        type: Number,
        unique: true,
    },
    active: {
        type: Boolean,
        required: true,
        default : true
    },
    userId: {
        type: Number
    }

});