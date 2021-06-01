// implement your posts router here
const express = require("express");
const router = express.Router();
const Posts = require("./posts-model");

router.get("/", (req, res) => {
  Posts.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "The posts information could not be retrieved",
      });
    });
});

router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((post) => {
      if (!post) {
        res.status(404).json({
          message: "The post with the specified ID does not exist",
        });
      } else {
        res.status(200).json(post);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "The post information could not be retrieved",
      });
    });
});

router.post("/", async (req, res) => {
  Posts.insert(req.body)
    .then((stuff) => {
        console.log(stuff)
      if (!req.body.title || !req.body.contents) {
        res
          .status(404)
          .json({ message: "Please provide title and contents for the post" });
      } else { req.body.id = stuff.id
        res.status(201).json(req.body);
        
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "There was an error while saving the post to the database",
      });
    });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const edits = req.body;
  try {
    if (!edits.title || !edits.contents) {
      res.status(400).json({
        message: "Please provide title and contents for the post",
      });
    } else {
      const updatedPost = await Posts.update(id, edits);
      if (!updatedPost) {
        res.status(404).json({
          message: "The post with the specified ID does not exist",
        });
      } else {
        res.json(updatedPost);
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "The post information could not be modified",
    });
  }
});

router.delete("/:id", (req, res) => {
  Posts.remove(req.params.id)
    .then((deletePost) => {
      if (deletePost) {
        res.status(200).json(req.body);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "The post could not be removed",
      });
    });
});

router.get("/:id/comments", (req, res) => {
  const { id } = req.params;
  Posts.findPostComments(id)
    .then((comments) => {
      if (!comments) {
        res.status(404).json({
          message: "The post with the specified ID does not exist",
        });
      } else {
        res.status(200).json(comments);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "The comments information could not be retrieved",
      });
    });
});

module.exports = router;
