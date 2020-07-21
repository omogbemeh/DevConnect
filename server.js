const express = require('express')
const connectDB = require('./config/db') //import the database connection
const app = express();

app.get( '/' , (req, res) => res.send('API Running'));

//Define Routes
app.use('/api/users', require('./routes/api/users')); //User Route
app.use('/api/posts', require('./routes/api/posts')); //Post Route
app.use('/api/profiles', require('./routes/api/profiles')); //Profiles Route
app.use('/api/auth', require('./routes/api/auth')); //Use Route

connectDB(); //Connect the database

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
