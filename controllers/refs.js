const cloudinary = require("../middleware/cloudinary");
const Ref = require("../models/Ref");

module.exports = { 
  createRef: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
  
      await Ref.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        link: req.body.link,
        likes: 0,
        user: req.user.id,
        iframe: req.user.iframe
      });
  
      // Fetch the 'refs' data
      const refs = await Ref.find(); // Adjust the query to retrieve the appropriate references
  
      console.log("Ref has been added!");
    
    } catch (err) {
      console.log(err);
    }
  },
    // createRef: async (req, res) => {
    //     try {
    //       // Upload image to cloudinary
    //       const result = await cloudinary.uploader.upload(req.file.path);
    
    //       await Ref.create({
    //         title: req.body.title,
    //         image: result.secure_url,
    //         cloudinaryId: result.public_id,
    //         media: req.body.media,
    //         likes: 0,
    //         user: req.user.id,
    //         iframe: req.user.iframe
    //       });
    //       console.log("Ref has been added!");
    //       res.redirect("/post/:id");
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   },
};
