const db = require("../../models");

const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const publicHoliday = {
    name_public_holiday: req.body.name_public_holiday,
    code_public_holiday: req.body.code_public_holiday,
    is_working_public_holiday: req.body.is_working_public_holiday,
    is_halfday_public_holiday: req.body.is_halfday_public_holiday,
    date_public_holidy: req.body.date_public_holidy,
    note_public_holiday: req.body.note_public_holiday,

    is_enable_public_holiday: 1,
  };
  db.public_holiday
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
  db.public_holiday
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

  db.public_holiday
    .update(req.body, {
      where: { id_public_holiday: id },
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

  db.public_holiday
    .update(
      { is_enable_public_holiday: 0 },
      {
        where: { id_public_holiday: id },
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

  db.public_holiday
    .update(
      { is_enable_public_holiday: 1 },
      {
        where: { id_public_holiday: id },
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
