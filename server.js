const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const router = require('./routes/api');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');
const { urlencoded } = require('express');

mongoose.connect(`${process.env.START_MONGODB}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.END_MONGODB}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
},(err)=>{
    !err && console.log('Successfully connected to mongoDB');
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: false}));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
}

//HTTP req logger
app.use(morgan('tiny'));

app.use('/api', router);


app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
});
