const db = require("../../models");
const config = require("../../config/config");
const axios = require("axios");

// const Shop = db.shops;
const Op = db.Sequelize.Op;
// const jwt = require("jsonwebtoken");
// const tokenData = require("../config/auth.config");

//const accessTokenSecret = tokenData.secret;
// Create and Save a new User
exports.createPeriodPayment = async (req, res) => {
  // Create comments
  // const period_payment = {
  // payment_type_id: req.body.payment_type_id,
  // employee_id: req.body.employee_id,
  // payment_method_type_id: req.body.payment_method_type_id,
  // title_period_payment: req.body.title_period_payment,
  // start_date_period_payment: req.body.start_date_period_payment,
  // end_date_period_payment: req.body.end_date_period_payment,
  // salary_amount_period_payment: req.body.salary_amount_period_payment,
  // paid_amount_period_payment: req.body.paid_amount_period_payment,
  // message_period_payment: req.body.message_period_payment,
  // note_period_payment: req.body.note_period_payment,
  // is_enable: 1,
  // };
  // db.period_payment
  //   .create(period_payment)
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "city cant be created",
  //     });
  //   });
  const period_payment = await db.period_payment.create(
    req.body,

    {
      include: [
        { model: db.increments, as: "increments" },
        { model: db.deductions, as: "deductions" },
      ],
    }
  );
  res.status(200).send({
    message: "done",
  });
};

exports.findAll = async (req, res) => {
  db.period_payment
    .findAll({
      include: [
        {
          model: db.increments,
          as: "increments",
          include: {
            model: db.increment_type,
            as: "increment_type",
          },
        },
        {
          model: db.deductions,
          as: "deductions",
          include: {
            model: db.deduction_type,
            as: "deduction_type",
          },
        },
        {
          model: db.payment_type,
          as: "payment_type",
        },
      ],
    })
    .then(async (salarydata) => {
      let final = [];
      const empList = await axios
        .get(`${config.EMP_BASEURL}/api/employee_info/getEmpListForSalary`)
        .catch((e) => {
          return res.send(e);
        });
      salarydata.map((x) => {
        empList.data.map((y) => {
          if (x.employee_id == y.empDetail.id_employee_info) {
            final.push({
              salaryInfo: x,
              empInfo: y,
            });
          }
        });
      });
      res.send(final);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no state id ",
      });
    });
};

exports.findByCityId = async (req, res) => {
  db.city
    .findOne({ where: { id_city: req.params.id, is_enable_city: 1 } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "this point title has no earned points ",
      });
    });
};

exports.update = async (req, res) => {
  const id = req.params.id;

  db.period_payment
    .update(req.body, {
      where: { id_period_payment: id },
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

exports.disableCityById = async (req, res) => {
  const id = req.params.id;

  db.city
    .update(
      { is_enable_city: 0 },
      {
        where: { id_city: id },
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

exports.enableCityById = async (req, res) => {
  const id = req.params.id;

  db.city
    .update(
      { is_enable_city: 1 },
      {
        where: { id_city: id },
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
