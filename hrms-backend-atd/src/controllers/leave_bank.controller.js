const db = require("../../models");
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const publicHoliday = {
    leave_type_id: req.body.leave_type_id,
    name_leave_bank: req.body.name_leave_bank,
    code_leave_bank: req.body.code_leave_bank,
    note_leave_bank: req.body.note_leave_bank,
    total_day_leave_bank: req.body.total_day_leave_bank,

    is_enable_leave_bank: 1,
  };
  db.leave_bank
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
  db.leave_bank
    .findAll({
      include: {
        model: db.leave_type,
        as: "leave_type",
      },
    })
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

  db.leave_bank
    .update(req.body, {
      where: { id_leave_bank: id },
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

  db.leave_bank
    .update(
      { is_enable_leave_bank: 0 },
      {
        where: { id_leave_bank: id },
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

  db.leave_bank
    .update(
      { is_enable_leave_bank: 1 },
      {
        where: { id_leave_bank: id },
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
