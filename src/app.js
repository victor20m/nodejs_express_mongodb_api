import express from 'express';
import transactionsRoute from './routes/transactions.js';
import transferRoute from './routes/transfer.js';
import mongoose from 'mongoose';
import loadTestData from './utilities/testData.js';
import dropDatabase from './utilities/dropDatabase.js';
import dbConfig from './config/database.js';
import scheduler from './tasks/fetchCotization.js';
import serverConfig from './config/serverConfig.js';

const { URI, PORT, DB_NAME } = dbConfig;
const {SERVER_URI, SERVER_PORT} = serverConfig;
const db = `${URI}:${PORT}/${DB_NAME}`;
let app = express();

/*
* Data will be wiped and reloaded upon 
* connecting to the database for demonstration purposes
*/
mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false 
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
app.use("/api/transactions", transactionsRoute);
app.use("/api/transfer", transferRoute);
scheduler();

app.listen(SERVER_PORT, SERVER_URI, () => {
  console.log(`Server running at http://${SERVER_URI}:${SERVER_PORT}`);
});