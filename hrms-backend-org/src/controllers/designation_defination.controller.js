const db = require("../../models");
const config = require("../../config/config");

const axios = require("axios");
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const desgn = {
    designation_type_id: req.body.designation_type_id,
    parent_designation_id: req.body.parent_designation_id,
    name_designation: req.body.name_designation,
    code_designation: req.body.code_designation,
    note_designation: req.body.note_designation,
    is_enable_designation: 1,
  };
  db.designation_defination
    .create(desgn)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "company def cant be created",
      });
    });
};

exports.findByCompanyId = async (req, res) => {
  db.designation_defination
    .findAll({ where: { company_id: req.params.id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no company id ",
      });
    });
};

exports.findById = async (req, res) => {
  db.designation_defination
    .findOne({
      where: { id_designation: req.params.id },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no company id ",
      });
    });
};
exports.findAll = async (req, res) => {
  db.designation_defination
    .findAll({
      include: {
        model: db.designation_defination,
        as: "parent_designation",
      },
    })
    .then(async (data) => {
      let final = [];
      for (let i = 0; i < data.length; i++) {
        let obj = new Object();
        const countapi = await axios
          .get(
            `${config.BASEURL}/api/employee_allocation/findCountforcompany/designation/${data[i].id_designation}`
          )
          .catch((e) => {
            return res.send(e);
          });
        obj = countapi.data;
        obj.details = data[i];

        final.push(obj);
      }

      res.send(final);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no company id ",
      });
    });
};

exports.forEmp = async (req, res) => {
  db.designation_defination
    .findAll({})
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

  db.designation_defination
    .update(req.body, {
      where: { id_designation: id },
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

  db.designation_defination
    .update(
      { is_enable_designation: 0 },
      {
        where: { id_designation: id },
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

  db.designation_defination
    .update(
      { is_enable_designation: 1 },
      {
        where: { id_designation: id },
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
