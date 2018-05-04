const People = require("./../model/people-schema");

exports.create = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.position ||
    !req.body.office ||
    !req.body.lab ||
    !req.body.email
  ) {
    return await res.status(400).send({
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

  person
    .save()
    .then(data => {
      await res.send(data);
    })
    .catch(err => {
      await res.status(500).send({
        message:
          err.message ||
          "Error while trying to persist person. Contact support for more info!"
      });
    });
};

exports.findAll = async (req, res) => {
  People.find()
    .then(people => {
      await res.send(people);
    })
    .catch(err => {
      await res.status(500).send({
        message:
          err.message ||
          "Error while trying to get all users. Contact support fore more info!"
      });
    });
};

exports.findById = async (req, res) => {
  People.findById(req.params.personId)
    .then(person => {
      if (!person) {
        return await res.status(404).send({
          message:
            "Could not find any person with the id " + req.params.personId
        });
      }
      await res.send(person);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return await res.status(404).send({
          message:
            "Could not find any person with the id " + req.params.personId
        });
      }
      return await res.status(500).send({
        message:
          "Error while trying to retrieve person with id " + req.params.personId
      });
    });
};

exports.update = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.position ||
    !req.body.office ||
    !req.body.lab ||
    !req.body.email
  ) {
    return await res.status(400).send({
      message: "Invalid person information. Please verify and try again!"
    });
  }

  People.findByIdAndUpdate(
    req.params.personId,
    {
      photo: req.body.photo || "",
      name: req.body.name,
      position: req.body.position,
      office: req.body.office,
      lab: req.body.lab,
      email: req.body.email
    },
    { new: true }
  )
    .then(person => {
      if (!person) {
        return await res.status(404).send({
          message:
            "Could not find any person with the id " + req.params.personId
        });
      }
      await res.send(person);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return await res.status(404).send({
          message:
            "Could not find any person with the id " + req.params.personId
        });
      }
      return await res.status(500).send({
        message:
          "Error while trying to retrieve person with id " + req.params.personId
      });
    });
};

exports.delete = async (req, res) => {
    People.findByIdAndRemove(req.params.personId).then(person => {
        if(!person) {
            return await res.status(404).send({
                message: "Could not find any person with the id " + req.params.personId
            });
        }
        await res.send({message: "Person deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return await res.status(404).send({
                message: "Could not find any person with the id " + req.params.personId
            });                
        }
        return await res.status(500).send({
            message: "Could not delete Person with id " + req.params.personId
        });
    })
};
