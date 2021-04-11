import BankAccount from './BankAccount.js';
import mongoose from 'mongoose';
import TransactionBatch from './TransactionBatch.js';
const { Schema, model } = mongoose;


const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  bank_accounts: {
      type: [BankAccount.Schema]
  },
  transactions: {
    type: [TransactionBatch.Schema]
  }
});

export default model('User', UserSchema);