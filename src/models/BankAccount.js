import mongoose from 'mongoose';

const { Schema, model } = mongoose

const BankAccountSchema = new Schema({
  accountId: {
    type: Number,
    required: true,
    unique: true
  },
  user_email: {
    type: String,
    required: true
  },
  balance: {
      type: Number,
      default: 0,
      required: true
  },
  currency: {
      type: String,
      required: true
  }
});

const BankAccount = model('Bank_Account', BankAccountSchema);

export default BankAccount;