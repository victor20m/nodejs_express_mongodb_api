import express from 'express';
import transactionsRoute from './routes/transactions.js';
import transferRoute from './routes/transfer.js';
import mongoose from 'mongoose';
import loadTestData from './utilities/testData.js';
import dropDatabase from './utilities/dropDatabase.js';
let app = express();


const host = "localhost";
const port = 7070;

const db = "mongodb://localhost:27017/mydb";
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }) // Adding new mongo url parser
  .then(() => {
    console.log("MongoDB Connected")
    dropDatabase()
    loadTestData();
    
  })
  .catch(err => console.log(err));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/transactions", transactionsRoute);
app.use("/transfer", transferRoute);


app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});