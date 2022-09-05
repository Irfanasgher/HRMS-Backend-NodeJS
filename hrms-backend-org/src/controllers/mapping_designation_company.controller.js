const db = require("../../models");

const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const desgn = {
    company_id: req.body.company_id,
    designation_id: req.body.designation_id,

    is_enable: 1,
  };
  db.mapping_designation_company
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
  await db.mapping_designation_company
    .findAll({
      include: {
        model: db.designation_defination,
        as: "designation_defination",
      },
      where: {
        company_id: req.params.id,
      },
    })
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

  db.mapping_designation_company
    .update(req.body, {
      where: { id_mapping_designation_company: id },
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

  db.mapping_designation_company
    .update(
      { is_enable: 0 },
      {
        where: { id_mapping_designation_company: id },
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

  db.mapping_designation_company
    .update(
      { is_enable: 1 },
      {
        where: { id_mapping_designation_company: id },
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
