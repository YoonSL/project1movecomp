

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ListSchema = new Schema({

    list: {
        type: String,
        required: true
    },
    cards: [
        {
            type: Schema.Types.ObjectId,
            ref: "Cards"
        }
    ]
});


const Lists = mongoose.model('Lists', ListSchema);


module.exports = Lists;