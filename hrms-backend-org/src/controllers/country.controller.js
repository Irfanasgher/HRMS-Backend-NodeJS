const db = require("../../models");

const Op = db.Sequelize.Op;
const sequelize = require("sequelize");

exports.createCountry = async (req, res) => {
  // const country = {
  //   name_country: req.body.name_country,
  //   letter_code_country: req.body.letter_code_country,
  //   iso_code_country: req.body.iso_code_country,
  //   is_enable_country: 1,
  // };
  // db.country
  //   .create(country)
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "company def cant be created",
  //     });
  //   });
  // await db.company_defination
  //   .findAll({
  //     attributes: {
  //       exclude: [
  //         "organization_id",
  //         "id_company",
  //         "name_company",
  //         "is_enable_company",
  //         "note_company",
  //         "createdAt",
  //       ],
  //     },
  //   })
  //   .then((data) => {
  //     console.log(data);
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "no company id ",
  //     });
  //   });
  var today = new Date();

  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!

  db.company_defination
    .findAll({
      where: {
        $and: [
          sequelize.where(
            sequelize.fn("updatedAt", sequelize.col("updatedAt")),
            mm
          ),
        ],
      },
      order: [sequelize.fn("mm", sequelize.col("birth_date"))],
    })
    .then(function (result) {
      res.status(200).json(result);
    });
};

exports.findById = async (req, res) => {
  db.country
    .findOne({ where: { id_country: req.params.id, is_enable_country: 1 } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no company id ",
      });
    });
};

exports.findAllCountries = async (req, res) => {
  await db.country
    .findAll({
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "letter_code_country",
          "iso_code_country",
          "is_enable_country",
        ],
      },
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

  db.country
    .update(req.body, {
      where: { id_country: id },
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

  db.country
    .update(
      { is_enable_country: 0 },
      {
        where: { id_country: id },
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

  db.country
    .update(
      { is_enable_country: 1 },
      {
        where: { id_country: id },
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
