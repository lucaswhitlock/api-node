const isNull = require("util");
const Contact = require("./../model/contacts-schema");

exports.create = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.phone ||
    !req.body.email ||
    !req.body.address
  ) {
    return res.status(400).send({
      message: "Invalid contact information. Please verify and try again!"
    });
  }

  const contact = new Contact({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address
  });

  try {
    const result = await contact.save();
    res.send(result);
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while trying to retrieve contacts!" });
  }
};

exports.findById = async (req, res) => {
  try {
    const result = await Contact.findById(req.params.contactId);
    if (result.isNull) {
      res.status(404).send({
        message: "Couldn't find any contact with the id:" + req.params.contactId
      });
    }
    res.send(result);
  } catch (err) {
    if (err.kind === "ObjectId" || err.kind === undefined) {
      return res.status(404).send({
        message: "Couldn't find any contact with the id:" + req.params.contactId
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
    !req.body.phone ||
    !req.body.email ||
    !req.body.address
  ) {
    return res.status(400).send({
      message: "Invalid contact information. Please verify and try again!"
    });
  }

  try {
    const result = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      { new: true }
    );
    if (result.isNull) {
      res.status(404).send({
        error: "Could not find any contact with the id " + req.params.contactId
      });
    }
  } catch (err) {
    if (err.kind === "ObjectId" || err.name === "NotFound") {
      return res.status(404).send({
        message: "Could not find any contact with the id " + req.params.contactId
      });
    }
    return res.status(500).send({
      message: "Could not delete contact with id " + req.params.contactId
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await Contact.findByIdAndRemove(req.params.contactId);
    if (result.isNull) {
      res.status(404).send({
        error: "Could not find any contact with the id " + req.params.contactId
      });
    }
  } catch (err) {
    if (err.kind === "ObjectId" || err.name === "NotFound") {
      return res.status(404).send({
        message: "Could not find any contact with the id " + req.params.contactId
      });
    }
    return res.status(500).send({
      message: "Could not delete contact with id " + req.params.contactId
    });
  }
};
