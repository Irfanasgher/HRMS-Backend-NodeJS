const db = require("../../models");

const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  // Create comment
  const addressType = {
    employee_id: req.body.employee_id,
    degree_id: req.body.degree_id,
    institute_name_education: req.body.institute_name_education,
    major_education: req.body.major_education,
    year_started_education: req.body.year_started_education,
    year_completed_education: req.body.year_completed_education,
    grade_gpa_education: req.body.grade_gpa_education,

    is_enable: 1,
  };
  await db.eductation
    .create(addressType)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "education cant be created",
      });
    });
};

exports.findall = async (req, res) => {
  db.eductation
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
  db.eductation
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
  db.eductation
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

  db.eductation
    .update(req.body, {
      where: { id_education: id },
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

  db.eductation
    .update(
      { is_enable: 0 },
      {
        where: { id_education: id },
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

  db.eductation
    .update(
      { is_enable: 1 },
      {
        where: { id_education: id },
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
