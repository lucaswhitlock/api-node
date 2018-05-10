const isNull = require("util");
const People = require("./../model/people-schema");

exports.create = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.position ||
    !req.body.office ||
    !req.body.lab ||
    !req.body.email
  ) {
    return res.status(400).send({
      message: "Invalid person information. Please verify and try again!"
    });
  }

  const person = new People({
    photo: req.body.photo || "",
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    lab: req.body.lab,
    email: req.body.email
  });

  try {
    const result = await person.save();
    res.send(result);
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const people = await People.find();
    console.log(People.find());
    res.json(people);
  } catch (err) {
    res.status(500).json({ message: "Error while trying to retrieve people!" });
  }
};

exports.findById = async (req, res) => {
  try {
    const result = await People.findById(req.params.personId);
    if (result.isNull) {
      res.status(404).send({
        message: "Couldn't find any person with the id:" + req.params.personId
      });
    }
    res.send(result);
  } catch (err) {
    if (err.kind === "ObjectId" || err.kind === undefined) {
      return res.status(404).send({
        message: "Couldn't find any person with the id:" + req.params.personId
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
    !req.body.name ||
    !req.body.position ||
    !req.body.office ||
    !req.body.lab ||
    !req.body.email
  ) {
    return res.status(400).send({
      message: "Invalid person information. Please verify and try again!"
    });
  }

  try {
    const result = await People.findByIdAndUpdate(
      req.params.personId,
      req.body,
      { new: true }
    );
    if (result.isNull) {
      res.status(404).send({
        error: "Could not find any person with the id " + req.params.personId
      });
    }
  } catch (err) {
    if (err.kind === "ObjectId" || err.name === "NotFound") {
      return res.status(404).send({
        message: "Could not find any person with the id " + req.params.personId
      });
    }
    return res.status(500).send({
      message: "Could not delete Person with id " + req.params.personId
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await People.findByIdAndRemove(req.params.personId);
    if (result.isNull) {
      res.status(404).send({
        error: "Could not find any person with the id " + req.params.personId
      });
    }
  } catch (err) {
    if (err.kind === "ObjectId" || err.name === "NotFound") {
      return res.status(404).send({
        message: "Could not find any person with the id " + req.params.personId
      });
    }
    return res.status(500).send({
      message: "Could not delete Person with id " + req.params.personId
    });
  }
};
