import mongoose from 'mongoose';

const { Schema, model } = mongoose
// Create Schema
const BankAccountSchema = new Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
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

const BankAccount = model('bankaccount', BankAccountSchema);

export default BankAccount;