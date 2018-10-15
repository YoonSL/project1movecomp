const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CardSchema = new Schema({

    card: {
        type: String,
        unique: true,
        trim: true,
        require: "need something"
    },
    list:{
        type: String,
        unique: true,
        require: "need something"
    }

});

const Cards = mongoose.model('ToDoModel', CardSchema);

module.exports = Cards;