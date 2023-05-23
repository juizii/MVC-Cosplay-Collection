const mongoose = require("mongoose");

const CountSchema = new mongoose.Schema({
    countdownDate: {
         type: Date, 
         required: true 
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
          }
  
});

module.exports = mongoose.model("Count", CountSchema);
