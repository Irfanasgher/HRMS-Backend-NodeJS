const db = require("../../models");
const axios = require("axios");

// const Shop = db.shops;
const Op = db.Sequelize.Op;
// const jwt = require("jsonwebtoken");
const config = require("../../config/config");

//const accessTokenSecret = tokenData.secret;
// Create and Save a new User
exports.create = async (req, res) => {
  // Create comment
  const addressType = {
    employee_info_id: req.body.employee_info_id,
    allocation_type_id: req.body.allocation_type_id,
    value_employee_allocation: req.body.value_employee_allocation,

    is_enable: 1,
  };
  await db.employee_allocation
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
  db.employee_allocation
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
  db.employee_allocation
    .findOne({
      where: {
        employee_info_id: req.params.id,
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

  db.employee_allocation
    .update(req.body, {
      where: { id_employee_allocation: id },
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

  db.employee_allocation
    .update(
      { is_enable: 0 },
      {
        where: { id_employee_allocation: id },
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

  db.employee_allocation
    .update(
      { is_enable: 1 },
      {
        where: { id_employee_allocation: id },
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
exports.findCountforcompany = async (req, res) => {
  await db.allocation_type
    .findOne({
      where: {
        name_allocation: req.params.name,
      },
    })
    .then(async (data) => {
      let count = await db.employee_allocation.findAll({
        where: {
          allocation_type_id: data.id_allocation,
          value_employee_allocation: req.params.id,
        },
      });

      res.send({ count: count.length });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no  id ",
      });
    });
};

exports.findGradeCount = async (req, res) => {
  const grades = await axios
    .get(`${config.BASEURL}/api/policy_group/findBenefitGroup`)
    .catch((e) => {
      return res.send(e);
    });
  let final = [];
  for (let i = 0; i < grades.data.length; i++) {
    let g = new Object();
    let a = await db.employee_allocation.count({
      where: { value_employee_allocation: grades.data[i].grade_policy_group },
    });
    g.count = a;
    g.detail = grades.data[i];
    final.push(g);
  }
  res.send(final);
  // db.employee_allocation
  //   .count({ where: { value_employee_allocation: req.params.grade } })
  //   .then((data) => {
  //     res.send({ count: data });
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "no  id ",
  //     });
  //   });
};
