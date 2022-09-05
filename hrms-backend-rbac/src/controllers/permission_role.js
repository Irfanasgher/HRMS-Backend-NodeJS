const db = require("../../models");

const Op = db.Sequelize.Op;

exports.createPermission = async (req, res) => {
  req.body.is_enable = 1;

  db.permission_role
    .bulkCreate(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "city cant be created",
      });
    });
};

exports.findAll = async (req, res) => {
  db.role
    .findAll({
      include: {
        model: db.permission_role,
        as: "permission_roles",
      },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no state id ",
      });
    });
};

exports.updateCityById = async (req, res) => {
  db.permission_role
    .destroy({
      where: { id_permission_role: req.body.arr },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "deleted successfully.",
        });
      } else {
        res.send({
          message: `Cannot delete id.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error deleting",
      });
    });
};
