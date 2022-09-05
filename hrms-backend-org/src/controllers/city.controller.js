const db = require("../../models");

// const Shop = db.shops;
const Op = db.Sequelize.Op;
// const jwt = require("jsonwebtoken");
// const tokenData = require("../config/auth.config");

//const accessTokenSecret = tokenData.secret;
// Create and Save a new User
exports.createCity = async (req, res) => {
  // Create comment
  const city = {
    state_id: req.body.state_id,
    name_city: req.body.name_city,
    is_enable_city: 1,
  };
  db.city
    .create(city)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "city cant be created",
      });
    });
};

exports.findByStateId = async (req, res) => {
  db.city
    .findAll({ where: { state_id: req.params.id, is_enable_city: 1 } })
    .then((data) => {
      res.send(data);
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

exports.updateCityById = async (req, res) => {
  const id = req.params.id;

  db.city
    .update(req.body, {
      where: { id_city: id },
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
