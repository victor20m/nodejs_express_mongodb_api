import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const CurrencySchema = new Schema({

    name: {
        type: String
    },
    abreviation: {
        type: String,
        unique: true
    },
    rate: {
        type: Number
    }
})

export default model('Currency', CurrencySchema);