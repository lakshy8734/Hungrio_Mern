const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors module
const app = express();
const port = 5000;
const mongoDb = require("./db");
mongoDb();

// Use cors middleware
app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("hello world");
})

app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/Displaydata'));
app.use('/api', require('./Routes/OrderData'));

app.listen(port, () => {
    console.log(`app listening on ${port}`);
})
