import mongoose from 'mongoose';

export default () => {

    return Promise.all(Object.keys(mongoose.connection.collections).map((collection) => {

        return new Promise((resolve, reject) => {
            mongoose.connection.collections[collection].drop(function (err) {
                console.log(`collection ${collection} dropped`);
                resolve();
            });
            
        })
    }))
}