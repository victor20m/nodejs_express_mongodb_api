import Transaction from './Transaction.js';
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const TransactionBatchSchema = new Schema({
    date: {
        type: String
    },
    user_email: {
        type: String
    },
    transactions: {
        type: [Transaction.Schema]
    }
});

let TransactionBatch = model('Transaction_Batch', TransactionBatchSchema);
TransactionBatchSchema.index({ date: 1, user_email: 1 }, { unique: true })

export default TransactionBatch;