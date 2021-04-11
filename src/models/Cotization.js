import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const CotizationSchema = new Schema({

    timestamp: {
        type: Number
    },
    base: {
        type: String
    },
    date: {
        type: String
    },
    rates: {
        type: String
    }
})

export default model('Cotization', CotizationSchema);