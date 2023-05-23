const mongoose = require("mongoose");

const CountSchema = new mongoose.Schema({
    countdownDate: {
         type: Date, 
         required: true 
        }
  
});

module.exports = mongoose.model("Count", CountSchema);
