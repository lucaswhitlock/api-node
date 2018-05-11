const isNull = require("util");
const Posts = require("./../model/posts-schema");

exports.create = async (req, res) => {
  if (
    !req.body.title ||
    !req.body.desc ||
    !req.body.info ||
    !req.body.img ||
    !req.body.reference
  ) {
    return res.status(400).send({
      message: "Invalid post information. Please verify and try again!"
    });
  }

  const post = new Posts({
    title: req.body.title,
    desc: req.body.desc,
    info: req.body.info,
    img: req.body.img,
    reference: req.body.reference
  });

  try {
    const result = await post.save();
    res.send(result);
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const result = await Posts.find();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Error while trying to retrieve posts!" });
  }
};

exports.findById = async (req, res) => {
  try {
    const result = await Posts.findById(req.params.postId);
    if (result.isNull) {
      res.status(404).send({
        message: "Couldn't find any post with the id:" + req.params.postId
      });
    }
    res.send(result);
  } catch (err) {
    if (err.kind === "ObjectId" || err.kind === undefined) {
      return res.status(404).send({
        message: "Couldn't find any post with the id:" + req.params.postId
      });
    }
    return res.status(500).send({
      message:
        "Database error, please contact your support for more information!"
    });
  }
};

exports.update = async (req, res) => {
  if (
    !req.body.title ||
    !req.body.desc ||
    !req.body.info ||
    !req.body.img ||
    !req.body.reference
  ) {
    return res.status(400).send({
      message: "Invalid post information. Please verify and try again!"
    });
  }

  try {
    const result = await Posts.findByIdAndUpdate(req.params.postId, req.body, {
      new: true
    });
    if (result.isNull) {
      res.status(404).send({
        error: "Could not find any post with the id " + req.params.postId
      });
    }
  } catch (err) {
    if (err.kind === "ObjectId" || err.name === "NotFound") {
      return res.status(404).send({
        message: "Could not find any post with the id " + req.params.postId
      });
    }
    return res.status(500).send({
      message: "Could not delete post with id " + req.params.postId
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await Posts.findByIdAndRemove(req.params.postId);
    if (result.isNull) {
      res.status(404).send({
        error: "Could not find any post with the id " + req.params.postId
      });
    }
  } catch (err) {
    if (err.kind === "ObjectId" || err.name === "NotFound") {
      return res.status(404).send({
        message: "Could not find any post with the id " + req.params.postId
      });
    }
    return res.status(500).send({
      message: "Could not delete post with id " + req.params.postId
    });
  }
};
