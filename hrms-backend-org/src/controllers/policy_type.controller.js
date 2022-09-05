const db = require("../../models");

const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const desgn = {
    name_policy_type: req.body.name_policy_type,
    code_policy_type: req.body.code_policy_type,

    is_enable_policy_type: 1,
  };
  db.policy_type
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
  db.policy_type
    .findOne({
      where: { id_policy_type: req.params.id },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no company id ",
      });
    });
};

exports.findByPolicyName = async (req, res) => {
  db.policy_type
    .findAll({ where: {} })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no policy type of this name ",
      });
    });
};
exports.findenablepolicy = async (req, res) => {
  db.policy_type
    .findAll({ where: { is_enable_policy_type: 1 } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no policy type of this name ",
      });
    });
};

exports.update = async (req, res) => {
  const id = req.params.id;

  db.policy_type
    .update(req.body, {
      where: { id_policy_type: id },
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

  db.policy_type
    .update(
      { is_enable_policy_type: 0 },
      {
        where: { id_policy_type: id },
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

  db.policy_type
    .update(
      { is_enable_policy_type: 1 },
      {
        where: { id_policy_type: id },
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
