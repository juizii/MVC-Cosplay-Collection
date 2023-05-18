const mongoose = require("mongoose");

const RefSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  cloudinaryId: {
    type: String,
    required: false,
  },
  link: {
    type: String,
    required: false,
  },
  likes: {
    type: Number,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tag: {
    type: String,
    required: false,
  }
});

module.exports = mongoose.model("Ref", RefSchema);