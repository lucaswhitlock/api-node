const isNull = require("util");
const Projects = require("./../model/projects-schema");

exports.create = async (req, res) => {
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.image ||
    !req.body.refnotice
  ) {
    return res.status(400).send({
      message: "Invalid project information. Please verify and try again!"
    });
  }

  const project = new Projects({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    refnotice: req.body.refnotice
  });

  try {
    const result = await project.save();
    res.send(result);
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const result = await Projects.find();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Error while trying to retrieve projects!" });
  }
};

exports.findById = async (req, res) => {
  try {
    const result = await Projects.findById(req.params.projectId);
    if (result.isNull) {
      res.status(404).send({
        message: "Couldn't find any project with the id:" + req.params.projectId
      });
    }
    res.send(result);
  } catch (err) {
    if (err.kind === "ObjectId" || err.kind === undefined) {
      return res.status(404).send({
        message: "Couldn't find any project with the id:" + req.params.projectId
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
    !req.body.description ||
    !req.body.image ||
    !req.body.refnotice
  ) {
    return res.status(400).send({
      message: "Invalid project information. Please verify and try again!"
    });
  }

  try {
    const result = await Projects.findByIdAndUpdate(req.params.projectId, req.body, {
      new: true
    });
    if (result.isNull) {
      res.status(404).send({
        error: "Could not find any project with the id " + req.params.projectId
      });
    }
  } catch (err) {
    if (err.kind === "ObjectId" || err.name === "NotFound") {
      return res.status(404).send({
        message: "Could not find any project with the id " + req.params.projectId
      });
    }
    return res.status(500).send({
      message: "Could not delete project with id " + req.params.projectId
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await Projects.findByIdAndRemove(req.params.projectId);
    if (result.isNull) {
      res.status(404).send({
        error: "Could not find any project with the id " + req.params.projectId
      });
    }
  } catch (err) {
    if (err.kind === "ObjectId" || err.name === "NotFound") {
      return res.status(404).send({
        message: "Could not find any project with the id " + req.params.projectId
      });
    }
    return res.status(500).send({
      message: "Could not delete project with id " + req.params.projectId
    });
  }
};
