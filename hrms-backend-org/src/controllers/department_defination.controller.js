const db = require("../../models");

const Op = db.Sequelize.Op;
const axios = require("axios");

const config = require("../../config/config");

exports.create = async (req, res) => {
  const dept = {
    company_id: req.body.company_id,
    parent_deparment_id: req.body.parent_deparment_id,
    name_department: req.body.name_department,
    code_department: req.body.code_department,
    note_department: req.body.note_department,
    is_enable_department: 1,
  };
  db.department_defination
    .create(dept)
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
  db.department_defination
    .findAll({
      include: [
        {
          model: db.mapping_department_locaiton,
          as: "mapping_department_locaitons",
          include: {
            model: db.location,
            as: "location",
            include: {
              model: db.company_defination,
              as: "company_defination",
            },
          },
        },
      ],
      where: { company_id: req.params.id },
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
  db.department_defination
    .findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no company id ",
      });
    });
};
exports.findAllForEmp = async (req, res) => {
  db.department_defination
    .findAll({
      include: [
        {
          model: db.mapping_department_locaiton,
          as: "mapping_department_locaitons",
          include: {
            model: db.location,
            as: "location",
            // include: {
            //   model: db.company_defination,
            //   as: "company_defination",
            // },
          },
        },
      ],
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

exports.findById = async (req, res) => {
  db.department_defination
    .findOne({
      where: { id_department: req.params.id },
      include: [
        {
          model: db.department_defination,
          as: "parent_deparment",
        },
        {
          model: db.mapping_department_locaiton,
          as: "mapping_department_locaitons",
          include: {
            model: db.location,
            as: "location",
            include: {
              model: db.company_defination,
              as: "company_defination",
            },
          },
        },
      ],
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

exports.updatedept = async (req, res) => {
  const id = req.params.id;

  db.department_defination
    .update(req.body, {
      where: { id_department: id },
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

  db.department_defination
    .update(
      { is_enable_department: 0 },
      {
        where: { id_department: id },
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

  db.department_defination
    .update(
      { is_enable_department: 1 },
      {
        where: { id_department: id },
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

exports.findAllDetail = async (req, res) => {
  db.department_defination
    .findAll({
      include: {
        model: db.department_defination,
        as: "parent_deparment",
      },
    })
    .then(async (data) => {
      let final = [];
      for (let i = 0; i < data.length; i++) {
        let obj = new Object();
        const countapi = await axios
          .get(
            `${config.BASEURL}/api/employee_allocation/findCountforcompany/department/${data[i].id_department}`
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
