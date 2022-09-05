const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
    {
        pizzaName: {
        type: String
        },
        createdBy: {
        type: String
        },
        createdAt: {
        type: Date,
        default: Date.now,
        //adding getters
        get: (createdAtVal) => dateFormat(createdAtVal)
        },
        size: {
        type: String,
        default: 'Large'
        },
        toppings: [],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    {
        //enable virtuals and getters
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

//Adding Virtual to
// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;