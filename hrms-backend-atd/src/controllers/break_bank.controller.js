const db = require("../../models");
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const publicHoliday = {
    time_slot_id: req.body.time_slot_id,
    break_type_id: req.body.break_type_id,
    name_break_bank: req.body.name_break_bank,
    code_break_bank: req.body.code_break_bank,
    frequency_break_bank: req.body.frequency_break_bank,
    duration_break_bank: req.body.duration_break_bank,
    note_break_bank: req.body.note_break_bank,

    is_enable_break_bank: 1,
  };
  db.break_bank
    .create(publicHoliday)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "public_holiday cant be created",
      });
    });
};

exports.findAll = async (req, res) => {
  db.break_bank
    .findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no holidays ",
      });
    });
};

exports.update = async (req, res) => {
  const id = req.params.id;

  db.break_bank
    .update(req.body, {
      where: { id_break_bank: id },
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

  db.break_bank
    .update(
      { is_enable_break_bank: 0 },
      {
        where: { id_break_bank: id },
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

  db.break_bank
    .update(
      { is_enable_break_bank: 1 },
      {
        where: { id_break_bank: id },
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
