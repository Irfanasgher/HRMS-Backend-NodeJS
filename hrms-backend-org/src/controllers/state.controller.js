const db = require("../../models");
var axios = require("axios");
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const desgn = {
    country_id: req.body.country_id,
    name_state: req.body.name_state,
    is_enable_state: 1,
  };
  db.state
    .create(desgn)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "company def cant be created",
      });
    });

  // for (let i = 0; i < req.body.country.length; i++) {
  //   const country = {
  //     name_country: req.body.country[i].country_name,
  //     letter_code_country: req.body.country[i].country_short_name,
  //     iso_code_country: req.body.country[i].country_phone_code,
  //     is_enable_country: 1,
  //   };
  //   await db.country
  //     .create(country)
  //     .then(async (countryData) => {
  //       var config = {
  //         method: "get",
  //         url: `https://www.universal-tutorial.com/api/states/${countryData.name_country}`,
  //         headers: {
  //           "api-token":
  //             "CjvJV-ARpa_QQPrUGLqmLviK9lsO26663I_HAvBnZYxV06iNtpM_dtjHN0ziLwCEGCM",
  //           "user-email": "ddany.khan.161l@rmtmarket.ru",
  //           Authorization:
  //             "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJkZGFueS5raGFuLjE2MWxAcm10bWFya2V0LnJ1IiwiYXBpX3Rva2VuIjoiQ2p2SlYtQVJwYV9RUVByVUdMcW1MdmlLOWxzTzI2NjYzSV9IQXZCblpZeFYwNmlOdHBNX2R0akhOMHppTHdDRUdDTSJ9LCJleHAiOjE2MjYxNjE1Mjd9.1onRd3sQCpR55DjE8EJQrbQ2A8vg7aphimIqmPY0-cQ",
  //         },
  //       };
  //       await axios(config)
  //         .then(async function (response) {
  //           for (let j = 0; j < response.data.length; j++) {
  //             const desgn = {
  //               country_id: countryData.id_country,
  //               name_state: response.data[j].state_name,
  //               is_enable_state: 1,
  //             };
  //             await db.state
  //               .create(desgn)
  //               .then(async (stateData) => {
  //                 // config = {
  //                 //   method: "get",
  //                 //   url: `https://www.universal-tutorial.com/api/cities/${stateData.name_state}`,
  //                 //   headers: {
  //                 //     "api-token":
  //                 //       "CjvJV-ARpa_QQPrUGLqmLviK9lsO26663I_HAvBnZYxV06iNtpM_dtjHN0ziLwCEGCM",
  //                 //     "user-email": "ddany.khan.161l@rmtmarket.ru",
  //                 //     Authorization:
  //                 //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJkZGFueS5raGFuLjE2MWxAcm10bWFya2V0LnJ1IiwiYXBpX3Rva2VuIjoiQ2p2SlYtQVJwYV9RUVByVUdMcW1MdmlLOWxzTzI2NjYzSV9IQXZCblpZeFYwNmlOdHBNX2R0akhOMHppTHdDRUdDTSJ9LCJleHAiOjE2MjYxNjE1Mjd9.1onRd3sQCpR55DjE8EJQrbQ2A8vg7aphimIqmPY0-cQ",
  //                 //   },
  //                 // };
  //                 // await axios(config)
  //                 //   .then(async function (response2) {
  //                 //     if (response2.length != 0) {
  //                 //       for (let j = 0; j < response2.data.length; j++) {
  //                 //         const desgn = {
  //                 //           state_id: stateData.id_state,
  //                 //           name_city: response2.data[j].city_name,
  //                 //           is_enable_city: 1,
  //                 //         };
  //                 //         await db.city
  //                 //           .create(desgn)
  //                 //           .then((stateData) => {})
  //                 //           .catch((err) => {
  //                 //             res.status(500).send({
  //                 //               message:
  //                 //                 err.message || "company def cant be created",
  //                 //             });
  //                 //           });
  //                 //       }
  //                 //     }
  //                 //   })
  //                 //   .catch(function (error) {
  //                 //     console.log(error);
  //                 //   });
  //               })
  //               .catch((err) => {
  //                 res.status(500).send({
  //                   message: err.message || "company def cant be created",
  //                 });
  //               });
  //           }
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //         });
  //     })
  //     .catch((err) => {
  //       res.status(500).send({
  //         message: err.message || "country def cant be created",
  //       });
  //     });
  // }
  // res.status(200).send({
  //   message: "all countries and states added",
  // });
};

exports.findById = async (req, res) => {
  db.state
    .findOne({ where: { id_state: req.params.id, is_enable_state: 1 } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no company id ",
      });
    });
};

exports.findByCountryId = async (req, res) => {
  await db.state
    .findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "is_enable_state"],
      },
      where: { country_id: req.params.id, is_enable_state: 1 },
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

  db.state
    .update(req.body, {
      where: { id_state: id },
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

  db.state
    .update(
      { is_enable_state: 0 },
      {
        where: { id_state: id },
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

  db.state
    .update(
      { is_enable_state: 1 },
      {
        where: { id_state: id },
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
