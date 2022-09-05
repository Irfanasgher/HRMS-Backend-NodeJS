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
    is_advance_employee_loan: req.body.is_advance_employee_loan,
    is_approved_employee_loan: req.body.is_approved_employee_loan,
    approval_date_employee_load: req.body.approval_date_employee_load,
    gross_salary_employee_loan: req.body.gross_salary_employee_loan,
    amount_employee_loan: req.body.amount_employee_loan,
    installment_amount_employee_loan: req.body.installment_amount_employee_loan,
    total_installment_employee_loan: req.body.total_installment_employee_loan,
    paid_installment_employee_loan: req.body.paid_installment_employee_loan,
    paid_amount_employee_loan: req.body.paid_amount_employee_loan,
    is_paid_employee_loan: req.body.is_paid_employee_loan,

    is_enable_employee_loan: 1,
  };
  await db.employee_loan
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
  db.employee_loan
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
  db.employee_loan
    .findOne({
      where: {
        employee_id: req.params.id,
        is_enable_employee_loan: 1,
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

  db.employee_loan
    .update(req.body, {
      where: { id_employee_loan: id },
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

  db.employee_loan
    .update(
      { is_enable_employee_loan: 0 },
      {
        where: { id_employee_loan: id },
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

  db.employee_loan
    .update(
      { is_enable_employee_loan: 1 },
      {
        where: { id_employee_loan: id },
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
