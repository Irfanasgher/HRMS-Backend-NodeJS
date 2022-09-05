const db = require("../../models");

// const Shop = db.shops;
const Op = db.Sequelize.Op;
// const jwt = require("jsonwebtoken");
// const tokenData = require("../config/auth.config");

//const accessTokenSecret = tokenData.secret;
// Create and Save a new User
exports.create = async (req, res) => {
  // Create comment
  const addressType = {
    certificaiton_id: req.body.certificaiton_id,
    employee_id: req.body.employee_id,
    completed_on_employee_certification:
      req.body.completed_on_employee_certification,
    valid_till_employee_certificaiton:
      req.body.valid_till_employee_certificaiton,
    result_employee_certificaiton: req.body.result_employee_certificaiton,
    identification_employee_certification:
      req.body.identification_employee_certification,

    is_enable: 1,
  };
  await db.employee_certificaiton
    .create(addressType)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "addressType cant be created",
      });
    });
};

exports.findall = async (req, res) => {
  db.employee_certificaiton
    .findAll({ where: {} })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no  id ",
      });
    });
};

exports.findById = async (req, res) => {
  db.employee_certificaiton
    .findAll({
      where: { employee_id: req.params.id, is_enable: 1 },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "this point title has no earned points ",
      });
    });
};

exports.findallByEmpId = async (req, res) => {
  db.employee_certificaiton
    .findAll({
      where: { employee_id: req.params.id, is_enable: 1 },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "this point title has no earned points ",
      });
    });
};

exports.updateById = async (req, res) => {
  const id = req.params.id;

  db.employee_certificaiton
    .update(req.body, {
      where: { id_employee_certification: id },
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

exports.disableById = async (req, res) => {
  const id = req.params.id;

  db.employee_certificaiton
    .update(
      { is_enable: 0 },
      {
        where: { id_employee_certification: id },
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
exports.enableById = async (req, res) => {
  const id = req.params.id;

  db.employee_certificaiton
    .update(
      { is_enable: 1 },
      {
        where: { id_employee_certification: id },
      }
    )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: " enable successfully .",
        });
      } else {
        res.send({
          message: `Cannot enable  id:${id}. Please check  ID.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating  id=" + id,
      });
    });
};
