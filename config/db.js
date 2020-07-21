const mongoose = require('mongoose'); //mongoose is required to use mondoDB
const config = require('config') //import the information from the default.json file
const db = config.get('mongoURI') //getting the db link

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log('Database is connnected.');
        
    } catch(err) {
        console.log(err.message);
        process.exit(1) //Exit process with error
    }
}

module.exports = connectDB;