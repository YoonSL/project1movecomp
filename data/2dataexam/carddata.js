const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CardSchema = new Schema({
    card:{
        type:String
    },
    noteincard:[
        {
            type: Schema.Types.ObjectId,
            ref: "Notes"
        }
    ]
});

var Cards = mongoose.model('Cards', CardSchema);

module.exports = Cards;