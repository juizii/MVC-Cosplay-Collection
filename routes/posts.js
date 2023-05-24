const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);

router.post("/createPost", upload.single("file"), postsController.createPost);//has to be the same name as the input to edit the image

router.post("/:id/createRef", upload.single("file"), postsController.createRef);


router.put("/editPost/:id", upload.single("image"), postsController.editPost); 

router.delete("/deletePost/:id", postsController.deletePost);

router.delete("/:id/deleteRef/:id", postsController.deleteRef);

module.exports = router;
