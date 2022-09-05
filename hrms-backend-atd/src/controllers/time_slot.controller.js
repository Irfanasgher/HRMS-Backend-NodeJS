const db = require("../../models");
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const publicHoliday = {
    seasonal_shift_id: req.body.seasonal_shift_id,
    regular_shift_id: req.body.regular_shift_id,
    start_time_slot: req.body.start_time_slot,
    end_time_slot: req.body.end_time_slot,
    early_factor_time_slot: req.body.early_factor_time_slot,
    late_factor_time_slot: req.body.late_factor_time_slot,
    grace_factor_overtime_time_slot: req.body.grace_factor_overtime_time_slot,
    is_over_time_slot: req.body.is_over_time_slot,
    note_time_slot: req.body.note_time_slot,

    is_enable_time_slot: 1,
  };
  db.time_slot
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
  db.time_slot
    .findAll({
      include: [
        {
          model: db.regular_shift,
          as: "regular_shift",
        },
        {
          model: db.seasonal_shift,
          as: "seasonal_shift",
        },
        {
          model: db.break_bank,
          as: "break_banks",
        },
      ],
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

  db.time_slot
    .update(req.body, {
      where: { id_time_slot: id },
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

  db.time_slot
    .update(
      { is_enable_time_slot: 0 },
      {
        where: { id_time_slot: id },
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

  db.time_slot
    .update(
      { is_enable_time_slot: 1 },
      {
        where: { id_time_slot: id },
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
