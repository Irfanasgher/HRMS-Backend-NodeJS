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
    employee_id: req.body.employee_id,
    dependent_type_id: req.body.dependent_type_id,
    fullname_employee_dependent: req.body.fullname_employee_dependent,
    mobile_employee_dependent: req.body.mobile_employee_dependent,
    email_employee_dependent: req.body.email_employee_dependent,
    dob_employee_dependent: req.body.dob_employee_dependent,
    gender_employee_dependent: req.body.gender_employee_dependent,
    cnic_employee_dependent: req.body.cnic_employee_dependent,
    is_primary_contact: req.body.is_primary_contact,
    date_enroll_employee_dependent: req.body.date_enroll_employee_dependent,
    is_same_address_employee_dependent:
      req.body.is_same_address_employee_dependent,
    is_same_permenant_address_employee_dependent:
      req.body.is_same_permenant_address_employee_dependent,

    is_enable: 1,
  };
  await db.employee_dependent
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
  db.employee_dependent
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
  db.employee_dependent
    .findOne({
      where: {
        employee_id: req.params.id,
        is_enable: 1,
      },
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

  db.employee_dependent
    .update(req.body, {
      where: { id_employee_dependent: id },
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

  db.employee_dependent
    .update(
      { is_enable: 0 },
      {
        where: { id_employee_dependent: id },
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

  db.employee_dependent
    .update(
      { is_enable: 1 },
      {
        where: { id_employee_dependent: id },
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
