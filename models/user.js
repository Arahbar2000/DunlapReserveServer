const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    booking: {
        type: Schema.Types.ObjectId,
        ref: 'booking'
    },
    displayName: String
});

userSchema.plugin(findOrCreate);

const User = mongoose.model('user', userSchema);

module.exports = User;