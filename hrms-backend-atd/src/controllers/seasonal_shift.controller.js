const db = require("../../models");

const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const shift = await db.seasonal_shift.bulkCreate(
    req.body,

    {
      include: [
        {
          model: db.time_slot,
          as: "time_slots",
          include: {
            model: db.break_bank,
            as: "break_banks",
          },
        },
      ],
    }
  );
  res.send(shift);
};

exports.findAll = async (req, res) => {
  db.seasonal_shift
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

  db.seasonal_shift
    .update(req.body, {
      where: { id_seasonal_shift: id },
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

  db.seasonal_shift
    .update(
      { is_enable_seasonal_shift: 0 },
      {
        where: { id_seasonal_shift: id },
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

  db.seasonal_shift
    .update(
      { is_enable_seasonal_shift: 1 },
      {
        where: { id_seasonal_shift: id },
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
