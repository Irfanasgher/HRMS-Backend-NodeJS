const db = require("../../models");
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const publicHoliday = {
    name_leave_type: req.body.name_leave_type,

    is_enable: 1,
  };
  db.leave_type
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
  db.leave_type
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

  db.leave_type
    .update(req.body, {
      where: { id_leave_type: id },
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

  db.leave_type
    .update(
      { is_enable: 0 },
      {
        where: { id_leave_type: id },
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

  db.leave_type
    .update(
      { is_enable: 1 },
      {
        where: { id_leave_type: id },
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
