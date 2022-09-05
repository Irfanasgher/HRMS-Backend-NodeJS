const db = require("../../models");

const Op = db.Sequelize.Op;

exports.createRole = async (req, res) => {
  req.body.is_enable = 1;

  db.role
    .create(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "city cant be created",
      });
    });
};

exports.findAll = async (req, res) => {
  db.role
    .findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no state id ",
      });
    });
};

exports.update = async (req, res) => {
  const id = req.params.id;

  db.role
    .update(req.body, {
      where: { id_role: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: " updated successfully .",
        });
      } else {
        res.send({
          message: `Cannot update  id:${id}. Please check  ID.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating  id=" + id,
      });
    });
};
