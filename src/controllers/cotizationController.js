import Cotization from '../models/Cotization.js';
import Currency from '../models/Currency.js';

export default {
    saveCotization: async (body) => {
        new Cotization({
            timestamp: body.timestamp,
            base: body.base,
            date: body.date,
            rates: JSON.stringify(body.rates)
        }).save();

        const cursor = Currency.find().cursor();
        for (let currencyDoc = await cursor.next(); currencyDoc != null; currencyDoc = await cursor.next()) {

            await currencyDoc.updateOne({rate: body.rates[currencyDoc.abreviation]})
        }
    }
}