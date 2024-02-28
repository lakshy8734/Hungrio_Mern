const mongoose = require("mongoose");
require('dotenv').config();

const mongoURI = process.env.MONGOURI;

const mongoDb = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
        
        // Access the "FoodCategory" collection
        const collection1 = mongoose.connection.db.collection("FoodItem");
        const data1 = await collection1.find({}).toArray();
        global.FoodItem = data1;

        const collection2 = mongoose.connection.db.collection("FoodCatogory");
        const data2 = await collection2.find({}).toArray();
        global.FoodCatogory = data2;



        

        // console.log(global.FoodItem);
    } catch (err) {
        console.error('Error querying MongoDB:', err);
    }
};

module.exports = mongoDb;
