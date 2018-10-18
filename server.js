const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended:true}));

app.use(express.static('public'));

mongoose.connect('mongodb://yoon:123456a@ds135993.mlab.com:35993/heroku_nqs1vd2j', {useNewUrlParser: true});

require('./routes/api-routes')(app);

app.listen(PORT, function(){
    console.log(`App running on port ${PORT}`);
})