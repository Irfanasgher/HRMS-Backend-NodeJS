const db = require("../../models");
const field_option = require("../../models/field_option");

const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  for (let i = 0; i < req.body.field_option.length; i++) {
    const dept = {
      custom_field_id: req.body.field_option[i].custom_field_id,
      name_field_option: req.body.field_option[i].name_field_option,

      is_enable: 1,
    };
    await db.field_option
      .create(dept)
      .then((data) => {})
      .catch((err) => {
        res.status(500).send({
          message: err.message || "company def cant be created",
        });
      });
  }
  res.send({ message: "added" });
};

exports.findBycustom_field_id = async (req, res) => {
  db.field_option
    .findAll({ where: { custom_field_id: req.params.id, is_enable: 1 } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no company id ",
      });
    });
};

exports.update = async (req, res) => {
  const id = req.params.id;

  db.field_option
    .update(req.body, {
      where: { id_field_option: id },
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

exports.disable = async (req, res) => {
  const id = req.params.id;

  db.field_option
    .update(
      { is_enable: 0 },
      {
        where: { id_field_option: id },
      }
    )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: " disable successfully .",
        });
      } else {
        res.send({
          message: `Cannot disable  id:${id}. Please check  ID.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating  id=" + id,
      });
    });
};

exports.enable = async (req, res) => {
  const id = req.params.id;

  db.field_option
    .update(
      { is_enable: 1 },
      {
        where: { id_field_option: id },
      }
    )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: " enable successfully .",
        });
      } else {
        res.send({
          message: `Cannot disable  id:${id}. Please check  ID.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating  id=" + id,
      });
    });
};
