import { Schema, model } from 'mongoose';


const TransferSchema = new Schema({
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

const Transfer = model('transfer', TransferSchema);

export default Transfer;