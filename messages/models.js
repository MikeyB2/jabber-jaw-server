const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const messageSchema = mongoose.Schema({
    roomId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },

});


messageSchema.methods.serialize = function () {
    return {
        roomId: this.roomId,
        username: this.username,
        text: this.text,

    };
};

const Message = mongoose.model('Message', messageSchema);

module.exports = { Message };