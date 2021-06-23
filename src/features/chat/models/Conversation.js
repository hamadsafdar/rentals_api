const {Schema} = require('mongoose');;



const conversationSchema = new Schema({
    participants: [{type: Schema.Types.ObjectId, ref: 'user'}]
});