const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionsSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        
    },
    questions:[
       
    ],
  

    date:{
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model('qusetions',QuestionsSchema );