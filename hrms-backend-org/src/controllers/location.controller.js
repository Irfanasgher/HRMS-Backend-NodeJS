const db = require("../../models");

const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  // const desgn = {
  //   unit_id: req.body.unit_id,
  //   city_id: req.body.city_id,
  //   tehsil_id: req.body.tehsil_id,
  //   name_location: req.body.name_location,
  //   code_location: req.body.code_location,
  //   address1_location: req.body.address1_location,
  //   address2_location: req.body.address2_location,
  //   postal_code_location: req.body.postal_code_location,
  //   note_location: req.body.note_location,

  //   is_enable_location: 1,
  // };
  // db.location
  //   .create(desgn)
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "company def cant be created",
  //     });
  //   });

  const desgn = {
    state_id: req.body.state_id,
    name_division: req.body.name_division,

    is_enable_division: 1,
  };
  await db.division
    .create(desgn)
    .then(async (divisionData) => {
      const district = {
        division_id: divisionData.id_division,
        name_district: req.body.name_district,

        is_enable_district: 1,
      };
      await db.district
        .create(district)
        .then(async (districtData) => {
          const tehsil = {
            district_id: districtData.id_district,
            name_tehsil: req.body.name_tehsil,

            is_enable_tehsil: 1,
          };
          await db.tehsil
            .create(tehsil)
            .then(async (tehsilData) => {
              const city = {
                state_id: req.body.state_id,
                name_city: req.body.name_city,
                is_enable_city: 1,
              };
              await db.city
                .create(city)
                .then(async (cityData) => {
                  console.log(req.body.organization_id);
                  const location = {
                    company_id: req.body.company_id,
                    organization_id: req.body.organization_id,
                    city_id: cityData.id_city,
                    tehsil_id: tehsilData.id_tehsil,
                    name_location: req.body.name_location,
                    code_location: req.body.code_location,
                    address1_location: req.body.address1_location,
                    address2_location: req.body.address2_location,
                    postal_code_location: req.body.postal_code_location,
                    note_location: req.body.note_location,
                    phone_location: req.body.phone_location,
                    email_location: req.body.email_location,

                    is_enable_location: 1,
                  };
                  await db.location
                    .create(location)
                    .then(async (locationData) => {
                      res.send(locationData);
                    })
                    .catch((err) => {
                      res.status(500).send({
                        message: err.message || "company def cant be created",
                      });
                    });
                  //-------------------------------
                  //------------------------------

                  // res.send(data);
                })
                .catch((err) => {
                  res.status(500).send({
                    message: err.message || "city cant be created",
                  });
                });
              // res.send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || "company def cant be created",
              });
            });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "company def cant be created",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "company def cant be created",
      });
    });
};

// exports.findByid_location = async (req, res) => {
//   db.location
//     .findOne({ where: { id_location: req.params.id } })
//     .then(async (locationdata) => {
//       let tehsil = await db.tehsil.findOne({
//         where: { id_tehsil: locationdata.tehsil_id },
//       });
//       console.log(tehsil);
//       let district = await db.district.findOne({
//         where: { id_district: tehsil.district_id },
//       });
//       let division = await db.division.findOne({
//         where: { id_division: district.division_id },
//       });
//       let city = await db.city.findOne({
//         where: { id_city: locationdata.city_id },
//       });
//       let state = await db.state.findOne({
//         where: { id_state: city.state_id },
//       });
//       let country = await db.country.findOne({
//         where: { id_country: state.country_id },
//       });

//       res.send({
//         locationdata,
//         tehsil,
//         district,
//         division,
//         city,
//         state,
//         country,
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "no company id ",
//       });
//     });
// };

exports.findByid_location = async (req, res) => {
  const address = await db.location.findOne({
    include: [
      {
        model: db.tehsil,
        require: true,
        as: "tehsil",
        include: [
          {
            model: db.district,
            require: true,
            as: "district",
            include: [
              {
                model: db.division,
                require: true,
                as: "division",
                include: [
                  {
                    model: db.state,
                    require: true,
                    as: "state",
                    include: [
                      { model: db.country, require: true, as: "country" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { model: db.city, require: true, as: "city" },
    ],

    where: { id_location: req.params.id },
  });
  res.status(200).json(address);
};

exports.findByCompanyid = async (req, res) => {
  db.location
    .findAll({
      include: [
        {
          model: db.tehsil,
          require: true,
          as: "tehsil",
          include: [
            {
              model: db.district,
              require: true,
              as: "district",
              include: [
                {
                  model: db.division,
                  require: true,
                  as: "division",
                  include: [
                    {
                      model: db.state,
                      require: true,
                      as: "state",
                      include: [
                        { model: db.country, require: true, as: "country" },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        { model: db.city, require: true, as: "city" },
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
exports.findBycity_id = async (req, res) => {
  db.location
    .findOne({ where: { city_id: req.params.id, is_enable_location: 1 } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no company id ",
      });
    });
};
exports.findBytehsil_id = async (req, res) => {
  db.location
    .findOne({ where: { tehsil_id: req.params.id, is_enable_location: 1 } })
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

  db.location
    .update(req.body, {
      where: { id_location: id },
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

  db.location
    .update(
      { is_enable_location: 0 },
      {
        where: { id_location: id },
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

  db.location
    .update(
      { is_enable_location: 1 },
      {
        where: { id_location: id },
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
