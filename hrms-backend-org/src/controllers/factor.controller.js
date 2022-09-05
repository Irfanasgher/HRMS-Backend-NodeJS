const db = require("../../models");

const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const desgn = {
    policy_id: req.body.policy_id,
    code_factor: req.body.code_factor,
    target_factor: req.body.target_factor,
    period_factor: req.body.period_factor,
    start_period_factor: req.body.start_period_factor,
    end_peroid_factor: req.body.end_peroid_factor,
    adjustment_factor: req.body.adjustment_factor,
    value_factor: req.body.value_factor,
    note_factor: req.body.note_factor,
    is_enable_factor: 1,
  };
  db.factor
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

exports.findByid_factor = async (req, res) => {
  db.factor
    .findOne({ where: { id_factor: req.params.id, is_enable_factor: 1 } })
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

  db.factor
    .update(req.body, {
      where: { id_factor: id },
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

  db.factor
    .update(
      { is_enable_factor: 0 },
      {
        where: { id_factor: id },
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

  db.factor
    .update(
      { is_enable_factor: 1 },
      {
        where: { id_factor: id },
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
