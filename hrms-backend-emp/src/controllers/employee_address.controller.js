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
    address_type_id: req.body.address_type_id,
    employee_id: req.body.employee_id,
    full_name_employee_address: req.body.full_name_employee_address,
    mobile_no_employee_address: req.body.mobile_no_employee_address,
    landline_employee_address: req.body.landline_employee_address,
    line_one_employee_address: req.body.line_one_employee_address,
    line_two_employee_address: req.body.line_two_employee_address,
    city_employee_address: req.body.city_employee_address,
    province_employee_address: req.body.province_employee_address,
    postal_code_employee_address: req.body.postal_code_employee_address,
    country_employee_address: req.body.country_employee_address,

    is_enable: 1,
  };
  await db.employee_address
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
  db.employee_address
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
  db.employee_address
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

  db.employee_address
    .update(req.body, {
      where: { id_employee_address: id },
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

  db.employee_address
    .update(
      { is_enable: 0 },
      {
        where: { id_employee_address: id },
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

  db.employee_address
    .update(
      { is_enable: 1 },
      {
        where: { id_employee_address: id },
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
