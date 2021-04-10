import mongoose from 'mongoose';

export default async () => {

    await Promise.all(Object.keys(mongoose.connection.collections).map((collection) => {
        mongoose.connection.collections[collection].drop(function (err) {
            console.log(`collection ${collection} dropped`);
        });
    }))
}