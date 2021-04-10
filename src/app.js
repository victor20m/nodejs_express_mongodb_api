let express = require('express');
let app = express();
module.exports = app;

const host = "localhost";
const port = 7070;

app.get('/', (req, res) => {
    res.send('Welcome! Please use the available endpoints /transactions or /transfer');
});

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});