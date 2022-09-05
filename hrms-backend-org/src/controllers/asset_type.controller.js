const db = require("../../models");

const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const desgn = {
    name_asset_type: req.body.name_asset_type,

    is_enable: 1,
  };
  db.asset_type
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
  db.asset_type
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

exports.findAll = async (req, res) => {
  db.asset_type
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
exports.getDetail = async (req, res) => {
  db.asset_type
    .findAll({
      include: {
        model: db.asset_detail,
        as: "asset_details",
      },
    })
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

  db.asset_type
    .update(req.body, {
      where: { id_asset_type: id },
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

  db.asset_type
    .update(
      { is_enable: 0 },
      {
        where: { id_asset_type: id },
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

  db.asset_type
    .update(
      { is_enable: 1 },
      {
        where: { id_asset_type: id },
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
