const db = require("../../models");

// const Shop = db.shops;
const Op = db.Sequelize.Op;
// const jwt = require("jsonwebtoken");
// const tokenData = require("../config/auth.config");

//const accessTokenSecret = tokenData.secret;
// Create and Save a new User
exports.createCompanyDef = async (req, res) => {
  // Create comment
  const companyDef = {
    organization_id: req.body.organization_id,
    name_company: req.body.name_company,
    note_company: req.body.note_company,
    ntn_company: req.body.ntn_company,
    phone_company: req.body.phone_company,
    email_company: req.body.email_company,
    url_website_company: req.body.url_website_company,
    url_logo: req.body.url_logo,
    legal_name_company: req.body.legal_name_company,
    code_company: req.body.code_company,
    time_zone_company: req.body.time_zone_company,
    description_company: req.body.description_company,
    is_enable_company: 1,
  };
  await db.company_defination
    .create(companyDef)
    .then(async (company_data) => {
      res.send(company_data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "company def cant be created",
      });
    });
  // const companyDef = {
  //   organization_id: req.body.organization_id,
  //   name_company: req.body.name_company,
  //   note_company: req.body.note_company,
  //   is_enable_company: 1,
  // };
  // await db.company_defination
  //   .create(companyDef)
  //   .then(async (company_data) => {
  //     if (req.body.designation_defination) {
  //       if (req.body.designation_defination.length != 0) {
  //         for (let i = 0; i < req.body.designation_defination.length; i++) {
  //           const desgn = {
  //             company_id: company_data.id_company,
  //             designation_type_id:
  //               req.body.designation_defination[i].designation_type_id,
  //             parent_designation_id:
  //               req.body.designation_defination[i].parent_designation_id,
  //             name_designation:
  //               req.body.designation_defination[i].name_designation,
  //             code_designation:
  //               req.body.designation_defination[i].code_designation,
  //             note_designation:
  //               req.body.designation_defination[i].note_designation,
  //             is_enable_designation: 1,
  //           };
  //           await db.designation_defination
  //             .create(desgn)
  //             .then((designation_data) => {
  //               // res.send(data);
  //             })
  //             .catch((err) => {
  //               res.status(500).send({
  //                 message: err.message || "company def cant be created",
  //               });
  //             });
  //         }
  //       }
  //     }
  //     //---------------------------------------------------
  //     // if (req.body.unit) {
  //     //   if (req.body.unit.length != 0) {
  //     //     for (let i = 0; i < req.body.unit.length; i++) {

  //     //     }
  //     //   }
  //     // }

  //     // if (req.body.city) {
  //     //   if (req.body.city.length != 0) {
  //     //     for (let i = 0; i < req.body.city.length; i++) {

  //     //     }
  //     //   }
  //     // }
  //     //----------------------------

  //     for (let q = 0; q < req.body.units.length; q++) {
  //       const unit = {
  //         company_id: company_data.id_company,
  //         name_unit: req.body.units[q].name_unit,
  //         code_unit: req.body.units[q].code_unit,
  //         note_unit: req.body.units[q].note_unit,
  //         // company_id: company_data.id_company,
  //         // name_unit: req.body.unit[i].name_unit,
  //         // code_unit: req.body.unit[i].code_unit,
  //         // note_unit: req.body.unit[i].note_unit,

  //         is_enable_unit: 1,
  //       };
  //       await db.unit
  //         .create(unit)
  //         .then(async (unitData) => {
  //           for (let w = 0; w < req.body.units[q].locations.length; w++) {
  //             const desgn = {
  //               state_id: req.body.units[q].locations[w].state_id,
  //               name_division: req.body.units[q].locations[w].name_division,

  //               is_enable_division: 1,
  //             };
  //             await db.division
  //               .create(desgn)
  //               .then(async (divisionData) => {
  //                 const desgn = {
  //                   division_id: divisionData.id_division,
  //                   name_district: req.body.units[q].locations[w].name_district,

  //                   is_enable_district: 1,
  //                 };
  //                 await db.district
  //                   .create(desgn)
  //                   .then(async (districtData) => {
  //                     const desgn = {
  //                       district_id: districtData.id_district,
  //                       name_tehsil: req.body.units[q].locations[w].name_tehsil,

  //                       is_enable_tehsil: 1,
  //                     };
  //                     await db.tehsil
  //                       .create(desgn)
  //                       .then(async (tehsilData) => {
  //                         const city = {
  //                           state_id: req.body.units[q].locations[w].state_id,
  //                           name_city: req.body.units[q].locations[w].name_city,
  //                           is_enable_city: 1,
  //                         };
  //                         await db.city
  //                           .create(city)
  //                           .then(async (cityData) => {
  //                             const location = {
  //                               unit_id: unitData.id_unit,
  //                               city_id: cityData.id_city,
  //                               tehsil_id: tehsilData.id_tehsil,
  //                               name_location:
  //                                 req.body.units[q].locations[w].name_location,
  //                               code_location:
  //                                 req.body.units[q].locations[w].code_location,
  //                               address1_location:
  //                                 req.body.units[q].locations[w]
  //                                   .address1_location,
  //                               address2_location:
  //                                 req.body.units[q].locations[w]
  //                                   .address2_location,
  //                               postal_code_location:
  //                                 req.body.units[q].locations[w]
  //                                   .postal_code_location,
  //                               note_location:
  //                                 req.body.units[q].locations[w].note_location,

  //                               is_enable_location: 1,
  //                             };
  //                             await db.location
  //                               .create(location)
  //                               .then(async (locationData) => {})
  //                               .catch((err) => {
  //                                 res.status(500).send({
  //                                   message:
  //                                     err.message ||
  //                                     "company def cant be created",
  //                                 });
  //                               });
  //                             //-------------------------------
  //                             //------------------------------

  //                             // res.send(data);
  //                           })
  //                           .catch((err) => {
  //                             res.status(500).send({
  //                               message: err.message || "city cant be created",
  //                             });
  //                           });
  //                         // res.send(data);
  //                       })
  //                       .catch((err) => {
  //                         res.status(500).send({
  //                           message:
  //                             err.message || "company def cant be created",
  //                         });
  //                       });
  //                   })
  //                   .catch((err) => {
  //                     res.status(500).send({
  //                       message: err.message || "company def cant be created",
  //                     });
  //                   });
  //               })
  //               .catch((err) => {
  //                 res.status(500).send({
  //                   message: err.message || "company def cant be created",
  //                 });
  //               });
  //           }
  //         })
  //         .catch((err) => {
  //           res.status(500).send({
  //             message: err.message || "unit def cant be created",
  //           });
  //         });
  //     }

  //     const policy = {
  //       company_id: company_data.id_company,
  //       name_policy: req.body.name_policy,
  //       description_policy: req.body.description_policy,
  //       note_policy: req.body.note_policy,

  //       is_enable_policy: 1,
  //     };
  //     await db.policy_defination
  //       .create(policy)
  //       .then((data) => {})
  //       .catch((err) => {
  //         res.status(500).send({
  //           message: err.message || "company def cant be created",
  //         });
  //       });

  //     res.send(company_data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "company def cant be created",
  //     });
  //   });
};

exports.getCompanyList = async (req, res) => {
  db.company_defination
    .findAll({
      attributes: {
        exclude: ["url_logo"],
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

exports.findByOrganizationID = async (req, res) => {
  db.company_defination
    .findAll({
      include: {
        model: db.location,
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
                          {
                            model: db.country,
                            require: true,
                            as: "country",
                          },
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
        as: "locations",
      },
      where: {
        organization_id: req.params.id,
      },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "this point title has no earned points ",
      });
    });
};

exports.updateOrganizationById = async (req, res) => {
  const id = req.params.id;

  db.company_defination
    .update(req.body, {
      where: { id_company: id },
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

exports.disableCompanyById = async (req, res) => {
  const id = req.params.id;

  db.company_defination
    .update(
      { is_enable_company: 0 },
      {
        where: { id_company: id },
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

exports.enableCompany = async (req, res) => {
  const id = req.params.id;

  db.company_defination
    .update(
      { is_enable_company: 1 },
      {
        where: { id_company: id },
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

exports.companyFanOut = async (req, res) => {
  var company = new Object();
  await db.company_defination
    .findOne({
      include: [
        {
          model: db.custom_form,
          as: "custom_form",
          include: {
            model: db.custom_field,
            as: "custom_field",
            include: [
              {
                model: db.custom_value,
                as: "custom_values",
              },
              {
                model: db.field_option,
                as: "field_options",
              },
            ],
          },
        },
        {
          model: db.mapping_company_policy,
          as: "mapping_company_policies",
          include: {
            model: db.policy_defination,
            as: "policy",
            include: [
              {
                model: db.factor,
                as: "factors",
              },
              {
                model: db.policy_type,
                as: "policy_type_policy_type",
              },
              {
                model: db.mapping_policy_group,
                as: "mapping_policy_groups",
                include: {
                  model: db.policy_group,
                  as: "policy_group",
                },
              },
              {
                model: db.policy_custom_field,
                as: "policy_custom_fields",
                include: [
                  {
                    model: db.policy_field_option,
                    as: "policy_field_options",
                  },
                  {
                    model: db.policy_custom_value,
                    as: "policy_custom_values",
                  },
                ],
              },
            ],
          },
        },
        {
          model: db.asset_detail,
          as: "asset_details",
          include: {
            model: db.asset_type,
            as: "asset_type",
          },
        },
        {
          model: db.mapping_designation_company,
          as: "mapping_designation_company",
          include: {
            model: db.designation_defination,
            as: "designation_defination",
            include: [
              {
                model: db.designation_defination,
                as: "parent_designation",
              },
              { model: db.designation_type, as: "designation_type" },
            ],
          },
        },
        {
          model: db.location,
          include: [
            {
              model: db.mapping_department_locaiton,
              as: "mapping_department_locaitons",
              include: {
                model: db.department_defination,
                as: "department",
                include: {
                  model: db.department_defination,
                  as: "parent_deparment",
                },
              },
            },
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
                            {
                              model: db.country,
                              require: true,
                              as: "country",
                            },
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
          as: "locations",
        },
      ],
      where: { id_company: req.params.id },
    })
    .then(async (companyData) => {
      res.send(companyData);

      // company.companyDetail = companyData;
      // await db.designation_defination
      //   .findAll({
      //     where: {
      //       company_id: companyData.id_company,
      //       is_enable_designation: 1,
      //     },
      //   })
      //   .then((designationData) => {
      //     if (designationData.length == 0) {
      //       company.designationDetail = null;
      //     } else {
      //       company.designationDetail = designationData;
      //     }
      //   })
      //   .catch((err) => {
      //     res.status(500).send({
      //       message: err.message || "no company id ",
      //     });
      //   });
      // //-------------------------------------------------
      // let dept = [];
      // await db.department_defination
      //   .findAll({
      //     where: {
      //       company_id: companyData.id_company,
      //       is_enable_department: 1,
      //     },
      //   })
      //   .then(async (deptData) => {
      //     if (deptData.length != 0) {
      //       for (let i = 0; i < deptData.length; i++) {
      //         await db.mapping_department_locaiton
      //           .findAll({
      //             where: {
      //               department_id: deptData[i].id_department,
      //               is_enable_mapping_department_location: 1,
      //             },
      //           })
      //           .then(async (mappingData) => {
      //             if (mappingData.length != 0) {
      //               let locationArr = [];
      //               for (let p = 0; p < mappingData.length; p++) {
      //                 const address = await db.location.findOne({
      //                   include: [
      //                     {
      //                       model: db.tehsil,
      //                       require: true,
      //                       as: "tehsil",
      //                       include: [
      //                         {
      //                           model: db.district,
      //                           require: true,
      //                           as: "district",
      //                           include: [
      //                             {
      //                               model: db.division,
      //                               require: true,
      //                               as: "division",
      //                               include: [
      //                                 {
      //                                   model: db.state,
      //                                   require: true,
      //                                   as: "state",
      //                                   include: [
      //                                     {
      //                                       model: db.country,
      //                                       require: true,
      //                                       as: "country",
      //                                     },
      //                                   ],
      //                                 },
      //                               ],
      //                             },
      //                           ],
      //                         },
      //                       ],
      //                     },
      //                     { model: db.city, require: true, as: "city" },
      //                   ],
      //                   where: { id_location: mappingData[p].location_id },
      //                 });
      //                 locationArr.push(address);
      //               }
      //               dept.push({
      //                 department: deptData[i],
      //                 mapping: (mappingData, locationArr),
      //               });
      //             } else {
      //               dept.push({
      //                 department: deptData[i],
      //                 mapping: null,
      //               });
      //             }
      //           })
      //           .catch((err) => {
      //             res.status(500).send({
      //               message: err.message || "no company id ",
      //             });
      //           });
      //       }
      //       company.departmentDetail = dept;
      //     } else {
      //       company.departmentDetail = null;
      //     }
      //   })
      //   .catch((err) => {
      //     res.status(500).send({
      //       message: err.message || "no company id ",
      //     });
      //   });
      // //--------------------------------------
      // await db.policy_defination
      //   .findAll({
      //     include: [
      //       {
      //         model: db.factor,
      //         include: [{ model: db.policy_type, as: "policy_type" }],
      //         require: false,
      //         as: "factors",
      //       },
      //     ],
      //     where: { company_id: companyData.id_company, is_enable_policy: 1 },
      //   })
      //   .then((policyData) => {
      //     // console.log(policyData);
      //     // let arr = [];
      //     if (policyData.length != 0) {
      //       company.polices = policyData;
      //     } else {
      //       company.polices = null;
      //     }
      //   })
      //   .catch((err) => {
      //     res.status(500).send({
      //       message: err.message || "no company id ",
      //     });
      //   });
      // //---------------------------------------
      // let location1 = [];
      // let location = [];
      // let extra = [];
      // await db.unit
      //   .findAll({
      //     where: { company_id: companyData.id_company, is_enable_unit: 1 },
      //   })
      //   .then(async (unitData) => {
      //     if (unitData.length != 0) {
      //       for (let p = 0; p < unitData.length; p++) {
      //         await db.location
      //           .findAll({
      //             where: {
      //               unit_id: unitData[p].id_unit,
      //               is_enable_location: 1,
      //             },
      //           })
      //           .then(async (locationData) => {
      //             //res.send(data);
      //             if (locationData.length != 0) {
      //               for (let a = 0; a < locationData.length; a++) {
      //                 await db.city
      //                   .findOne({
      //                     where: { id_city: locationData[a].city_id },
      //                   })
      //                   .then(async (cityData) => {
      //                     await db.tehsil
      //                       .findOne({
      //                         where: { id_tehsil: locationData[a].tehsil_id },
      //                       })
      //                       .then(async (tehsilData) => {
      //                         await db.district
      //                           .findOne({
      //                             where: {
      //                               id_district: tehsilData.district_id,
      //                             },
      //                           })
      //                           .then(async (districtData) => {
      //                             await db.division
      //                               .findOne({
      //                                 where: {
      //                                   id_division: districtData.division_id,
      //                                 },
      //                               })
      //                               .then(async (divisionData) => {
      //                                 await db.state
      //                                   .findOne({
      //                                     where: {
      //                                       id_state: divisionData.state_id,
      //                                     },
      //                                   })
      //                                   .then(async (stateData) => {
      //                                     await db.country
      //                                       .findOne({
      //                                         where: {
      //                                           id_country:
      //                                             stateData.country_id,
      //                                         },
      //                                       })
      //                                       .then((countryData) => {
      //                                         location1.push({
      //                                           location: locationData[a],
      //                                           city: cityData,
      //                                           state: stateData,
      //                                           country: countryData,
      //                                           division: divisionData,
      //                                           district: districtData,
      //                                           tehsil: tehsilData,
      //                                         });
      //                                       })
      //                                       .catch((err) => {
      //                                         res.status(500).send({
      //                                           message:
      //                                             err.message ||
      //                                             "no company id ",
      //                                         });
      //                                       });
      //                                   })
      //                                   .catch((err) => {
      //                                     res.status(500).send({
      //                                       message:
      //                                         err.message || "no company id ",
      //                                     });
      //                                   });
      //                               })
      //                               .catch((err) => {
      //                                 res.status(500).send({
      //                                   message:
      //                                     err.message || "no company id ",
      //                                 });
      //                               });
      //                           })
      //                           .catch((err) => {
      //                             res.status(500).send({
      //                               message: err.message || "no company id ",
      //                             });
      //                           });
      //                       })
      //                       .catch((err) => {
      //                         res.status(500).send({
      //                           message: err.message || "no company id ",
      //                         });
      //                       });
      //                   })
      //                   .catch((err) => {
      //                     res.status(500).send({
      //                       message:
      //                         err.message ||
      //                         "this point title has no earned points ",
      //                     });
      //                   });
      //               }
      //               location.push({
      //                 unitDetail: unitData[p],
      //                 location: location1,
      //               });
      //               location1 = [];
      //             } else {
      //               location.push({
      //                 unitDetail: unitData[p],
      //                 location: null,
      //               });
      //             }
      //           })
      //           .catch((err) => {
      //             res.status(500).send({
      //               message: err.message || "no company id ",
      //             });
      //           });
      //       }
      //       company.unit = location;
      //     } else {
      //       company.unit = null;
      //     }
      //   })
      //   .catch((err) => {
      //     res.status(500).send({
      //       message: err.message || "no company id ",
      //     });
      //   });
      // //-------------------------------------------
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "this point title has no earned points ",
      });
    });
};
