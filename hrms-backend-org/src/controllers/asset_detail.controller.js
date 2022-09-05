const db = require("../../models");

const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const dept = {
    asset_type_id: req.body.asset_type_id,
    company_id: req.body.company_id,
    name_asset: req.body.name_asset,
    serial_number_asset: req.body.serial_number_asset,
    detail_asset: req.body.detail_asset,
    value_asset: req.body.value_asset,

    is_enable: 1,
  };
  db.asset_detail
    .create(dept)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "company def cant be created",
      });
    });
};

exports.findAll = async (req, res) => {
  db.asset_detail
    .findAll({ where: {} })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no company id ",
      });
    });
};
exports.findByCompanyId = async (req, res) => {
  db.asset_detail
    .findAll({
      include: {
        model: db.asset_type,
        as: "asset_type",
      },
      where: { company_id: req.params.id },
    })
    .then(async (data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no company id ",
      });
    });
};
exports.findAll = async (req, res) => {
  db.asset_detail
    .findAll({
      include: {
        model: db.asset_type,
        as: "asset_type",
      },
    })
    .then(async (data) => {
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

  db.asset_detail
    .update(req.body, {
      where: { id_asset: id },
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

  db.asset_detail
    .update(
      { is_enable: 0 },
      {
        where: { id_asset: id },
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

  db.asset_detail
    .update(
      { is_enable: 1 },
      {
        where: { id_asset: id },
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
exports.forEmpModule = async (req, res) => {
  db.asset_detail
    .findOne({
      include: {
        model: db.asset_type,
        as: "asset_type",
      },
      where: { id_asset: req.params.id },
    })
    .then(async (data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no company id ",
      });
    });
};
