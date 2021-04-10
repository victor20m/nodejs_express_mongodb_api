import express from 'express';
import transactionsRoute from './routes/transactions.js';
import transferRoute from './routes/transfer.js';
import mongoose from 'mongoose';
import loadTestData from './utilities/testData.js';
import dropDatabase from './utilities/dropDatabase.js';
import dbConfig from './config/database.js';

const User = mongoose.model('User')
const { URI, PORT, DB_NAME } = dbConfig;
let app = express();


const host = "localhost";
const port = 7070;

const db = `${URI}:${PORT}/${DB_NAME}`

//Data will be wiped and reloaded upon connecting to the database for demonstration purposes
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB Connected")
    dropDatabase().then(() => {
      loadTestData();
    })
  })
  .catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/transactions", transactionsRoute);
app.use("/transfer", transferRoute);


app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});