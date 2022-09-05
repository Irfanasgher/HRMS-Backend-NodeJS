const db = require("../../models");

const Op = db.Sequelize.Op;

exports.createUserRole = async (req, res) => {
  req.body.is_enable = 1;

  db.user_role
    .create(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "city cant be created",
      });
    });
};
exports.getEmpPermissions = async (req, res) => {
  db.user_role
    .findOne({
      where: { employee_id: req.params.id },
      include: {
        model: db.role,
        as: "role",
        include: {
          model: db.permission_role,
          as: "permission_roles",
        },
      },
    })
    .then((data) => {
      if (data) res.send(data);
      else {
        res.send({ role: "guest" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no state id ",
      });
    });
};
