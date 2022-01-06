import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
  Date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  debit: {
    type: Boolean,
    required: true
  },
  credit: {
    type: Boolean,
    required: true
  },
  amount: {
    type: Number,
    required : true
  },
  receiverAccountNumber: {
    type: String,
    
  }

});