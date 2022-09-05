const db = require("../../models");

const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const dept = {
    name_custom_field: req.body.name_custom_field,
    type_custom_field: req.body.type_custom_field,

    is_enable: 1,
  };
  db.custom_field
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

exports.findAll = async (req, res) => {
  db.custom_field
    .findAll({ where: { is_enable: 1 } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no company id ",
      });
    });
};
exports.findNames = async (req, res) => {
  let list = {};
  db.custom_field
    .findAll({ attributes: ["name_custom_field"] })
    .then(async (data) => {
      // console.log(data);
      data.map((item, k) => {
        list[item.name_custom_field] = item.name_custom_field;
      });
      res.send(list);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no company id ",
      });
    });
};

exports.update = async (req, res) => {
  const id = req.params.id;

  db.custom_field
    .update(req.body, {
      where: { id_custom_field: id },
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

  db.custom_field
    .update(
      { is_enable: 0 },
      {
        where: { id_custom_field: id },
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

  db.custom_field
    .update(
      { is_enable: 1 },
      {
        where: { id_custom_field: id },
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
