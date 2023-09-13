const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Ref = require("../models/Ref");
const Countdown = require("../models/Countdown");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });

      const userId = req.user.id;

      // Retrieve the countdown document for the logged-in user
      const countdown = await Countdown.findOne({ user: userId });

      res.render("profile.ejs", { posts, user: req.user, countdown });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const postId = req.params.id;

      // Fetch the specific post
      const post = await Post.findById(postId);

      // Fetch the references related to the specific post
      const refs = await Ref.find({ postId: postId });

      res.render("post.ejs", { post: post, user: req.user, refs: refs });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        media: req.body.media,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile#speakers");
    } catch (err) {
      console.log(err);
    }
  },
  createRef: async (req, res) => {
    try {
      const postId = req.params.id; // Get the post ID from the request parameters

      if (req.file) {
        // If an image is uploaded
        const result = await cloudinary.uploader.upload(req.file.path);

        await Ref.create({
          title: "",
          image: result.secure_url,
          cloudinaryId: result.public_id,
          link: "",
          user: req.user.id,
          // Assign the postId to the created ref
          postId: postId, 
          tag: req.body.tag,
        });
      } else {
        // If only title, caption, and link are provided
        await Ref.create({
          title: req.body.title,
          image: "",
          cloudinaryId: "",
          link: req.body.link,
          user: req.user.id,
          // Assign the postId to the created ref
          postId: postId, 
          tag: req.body.tag,
        });
      }

      console.log("Ref has been added!");
      res.redirect(`/post/${postId}`);
    } catch (err) {
      console.log(err);
      res.redirect(`/post/${postId}`);
    }
  },

  editPost: async (req, res) => {
    try {
      console.log(req.body);
      console.log(req.file);

      const post = await Post.findById(req.params.id);

      if (req.file) {
        // Upload new image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        // Delete previous image from cloudinary
        await cloudinary.uploader.destroy(post.cloudinaryId);

        // Update post with new image and cloudinary ID
        post.title = req.body.title;
        post.image = result.secure_url;
        post.cloudinaryId = result.public_id;
        post.media = req.body.media;
      } else {
        // Update post without changing image
        post.title = req.body.title;
        post.media = req.body.media;
      }

      await post.save();

      console.log("Successfully Edited!");
      res.redirect(`/profile`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile#speakers");
    } catch (err) {
      res.redirect("/profile#speakers");
    }
  },
  deleteRef: async (req, res) => {
    try {
      let ref = await Ref.findById(req.params.id);
      if (!ref) {
        return res.status(404).send("Ref not found");
      }

      if (ref.cloudinaryId) {
        await cloudinary.uploader.destroy(ref.cloudinaryId);
      }

      await Ref.findByIdAndRemove(req.params.id);

      console.log("Deleted Ref");

      res.redirect("back");
    } catch (err) {
      console.log(err);
      res.redirect("back");
    }
  },
};
