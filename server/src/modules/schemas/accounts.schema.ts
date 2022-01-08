import { debug } from 'console';
import * as mongoose from 'mongoose';

export const AccountSchema = new mongoose.Schema({
    balance: {
        type: Number,
        default : 100,
        unique: false
    },
    accountNumber: {
        type: String,
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

AccountSchema.methods.updateBalance = function (amount) {
    this.balance += Number(amount);
    return this.save();
};