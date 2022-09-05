const db = require("../../models");

const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const desgn = {
    company_id: req.body.company_id,
    department_id: req.body.department_id,
    location_id: req.body.location_id,
    note_mapping_department_location: req.body.note_mapping_department_location,

    is_enable_mapping_department_location: 1,
  };
  db.mapping_department_locaiton
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
  db.mapping_department_locaiton
    .findAll({
      include: [
        { model: db.location, as: "location" },
        {
          model: db.department_defination,
          as: "department",
        },
      ],
      where: {
        company_id: req.params.id,
      },
    })
    .then(async (data) => {
      // let deptId = [];
      // for (let i = 0; i < data.length; i++) {
      //   deptId.push(data[i].department_id);
      // }
      // let dept = await db.department_defination.findAll({
      //   where: {
      //     id_department: deptId,
      //   },
      // });
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

  db.mapping_department_locaiton
    .update(req.body, {
      where: { id_mapping_department_location: id },
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

  db.mapping_department_locaiton
    .update(
      { is_enable_mapping_department_location: 0 },
      {
        where: { id_mapping_department_location: id },
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

  db.mapping_department_locaiton
    .update(
      { is_enable_mapping_department_location: 1 },
      {
        where: { id_mapping_department_location: id },
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
