const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        
    },
    todo:{
        type: String,
        required: true
    },
    status:{
        type:Boolean,
        default:false
    },
 
    date:{
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model('notes', NotesSchema);