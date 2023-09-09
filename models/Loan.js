const mongoose = require('mongoose');

// Define the schema
const loadSchema = new mongoose.Schema({

  installation: {
    type: Number,
    required: true,
  },

  status:{
type:String,
default:"pending"
  },

  loanid:{
    type:String,

  },
  useremail:{
    type:String
  },

  type: {
    type: String,
    required: true,
  },
  paidInstallments:{
    type:Number,
    default:0
  },
  
  userId: {
    type: String,
    required: true,
  },
  applieddate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  issuedDate:{
  type:Date,

  },
  expireDate: {
  type: Date,

  },
});

// Create a model based on the schema
const Loan = mongoose.model('Loan', loadSchema);

module.exports = Loan;
