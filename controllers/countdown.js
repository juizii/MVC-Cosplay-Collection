const Countdown = require("../models/Countdown");

module.exports = {
  getCountdown: async (req, res) => {
    try {
      const userId = req.user._id;

      // Find the countdown document for the current user
      const countdown = await Countdown.findOne({ user: userId });

      res.render("profile", { countdown });
    } catch (err) {
      console.error(err);
      res.render("error/500");
    }
  },
  setCountdown: async (req, res) => {
    try {
      const { countdownDate } = req.body;
      const userId = req.user._id;
  
      // Find the countdown document for the current user
      let countdown = await Countdown.findOne({ user: userId });
  
      if (countdown) {
        // If countdown document exists, update the countdownDate field
        countdown.countdownDate = new Date(countdownDate);
      } else {
        // If countdown document doesn't exist, create a new one
        countdown = new Countdown({ countdownDate: new Date(countdownDate), user: userId });
      }
  
      // Save the countdown document
      await countdown.save();
  
      // Redirect to the profile page
      res.redirect("/profile");
    } catch (err) {
      console.error(err);
      res.render("error/500");
    }
  },
  resetCountdown: async (req, res) => {
   try {
    const userId = req.user._id;

    // Find the countdown document for the current user
    const countdown = await Countdown.findOne({ user: userId });

    if (countdown) {
      // If countdown document exists, delete it
      await countdown.remove();
      console.log("Countdown deleted successfully.");
    } else {
      console.log("Countdown not found.");
    }

    res.redirect("/profile");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
  }

};