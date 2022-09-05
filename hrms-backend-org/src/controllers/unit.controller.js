const db = require("../../models");

const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const desgn = {
    company_id: req.body.company_id,
    name_unit: req.body.name_unit,
    code_unit: req.body.code_unit,
    note_unit: req.body.note_unit,

    is_enable_unit: 1,
  };
  db.unit
    .create(desgn)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "company def cant be created",
      });
    });
};

exports.findById = async (req, res) => {
  db.unit
    .findOne({ where: { id_unit: req.params.id, is_enable_unit: 1 } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no company id ",
      });
    });
};

exports.findBycompany_id = async (req, res) => {
  db.unit
    .findAll({ where: { company_id: req.params.id, is_enable_unit: 1 } })
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

  db.unit
    .update(req.body, {
      where: { id_unit: id },
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

  db.unit
    .update(
      { is_enable_unit: 0 },
      {
        where: { id_unit: id },
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

  db.unit
    .update(
      { is_enable_unit: 1 },
      {
        where: { id_unit: id },
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
