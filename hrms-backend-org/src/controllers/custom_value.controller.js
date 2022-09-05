const db = require("../../models");

const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  for (let i = 0; i < req.body.mydata.length; i++) {
    const dept = {
      custom_field_id: req.body.mydata[i].custom_field_id,
      company_id: req.body.mydata[i].company_id,
      entered_custom_value: req.body.mydata[i].entered_custom_value,

      is_enable: 1,
    };
    await db.custom_value.create(dept);
  }
  res.status(200).send({
    message: "created ",
  });
};

exports.findByCompanyId = async (req, res) => {
  db.custom_value
    .findAll({ where: { company_id: req.params.id, is_enable: 1 } })
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
  db.custom_value
    .findOne({
      where: { id_custom_value: req.params.id, is_enable: 1 },
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

exports.update = async (req, res) => {
  const id = req.params.id;

  db.custom_value
    .update(req.body, {
      where: { id_custom_value: id },
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

  db.custom_value
    .update(
      { is_enable: 0 },
      {
        where: { id_custom_value: id },
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

  db.custom_value
    .update(
      { is_enable: 1 },
      {
        where: { id_custom_value: id },
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
