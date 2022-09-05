const db = require("../../models");
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const publicHoliday = {
    name_over_time: req.body.name_over_time,
    code_over_time: req.body.code_over_time,
    required_duration_over_time: req.body.required_duration_over_time,
    adjustment_percentage_over_time: req.body.adjustment_percentage_over_time,
    adjustment_value_over_time: req.body.adjustment_value_over_time,
    max_duration_over_time: req.body.max_duration_over_time,
    note_over_time: req.body.note_over_time,

    is_enable_over_time: 1,
  };
  db.over_time
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
  db.over_time
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

  db.over_time
    .update(req.body, {
      where: { id_over_time: id },
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

  db.over_time
    .update(
      { is_enable_over_time: 0 },
      {
        where: { id_over_time: id },
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

  db.over_time
    .update(
      { is_enable_over_time: 1 },
      {
        where: { id_over_time: id },
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
