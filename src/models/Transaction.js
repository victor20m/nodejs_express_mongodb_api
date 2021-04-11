import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const TransactionSchema = new Schema({
  accountIdFrom: {
    type: Number,
    required: true,
  },
  accountIdTo: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
      type: String,
      required: true
  },
  date: {
      type: Date,
      default: Date.now
  },
  description: {
      type: String
  }
});

const Transaction = model('Transaction', TransactionSchema);

export default Transaction;