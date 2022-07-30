const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
        default: 0,
    },
    actord: [{
        type: Schema.Types.ObjectId,
        ref: "actor",
    }]
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = model("movie", movieSchema);