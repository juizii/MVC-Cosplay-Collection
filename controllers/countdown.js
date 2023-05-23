const cloudinary = require("../middleware/cloudinary");
const Countdown = require("../models/Countdown");

module.exports = {
  getCountdown: async (req, res) => {
      try {
        const postId = req.params.id;
        const countdown = await Countdown.findOne({ postId });
  
        res.render("profile", { countdown });
      } catch (err) {
        console.error(err);
        res.render("error/500");
      }
    },
  setCountdown: async (req, res) => {
    try {
      const postId = req.params.id;
      const { countdownDate } = req.body;
  
      let countdown = await Countdown.findOne({ postId });
  
      if (countdown) {
        countdown.countdownDate = countdownDate;
        await countdown.save();
      } else {
        countdown = new Countdown({ postId, countdownDate: countdownDate });
        await countdown.save();
      }
  
      res.redirect("/profile"); // Redirect to the profile page
    } catch (err) {
      console.error(err);
      res.redirect("/profile"); // Redirect to the profile page
    }
  },
  
};