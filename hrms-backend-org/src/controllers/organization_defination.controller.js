const db = require("../../models");
const axios = require("axios");
const location = require("../../models/location");
const { secret } = require("../../config/authConfig");
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const desgn = {
    name_organization: req.body.name_organization,
    code_organization: req.body.code_organization,
    note_organization: req.body.note_organization,
    url_logo_organization: req.body.url_logo_organization,
    legal_name_organization: req.body.legal_name_organization,
    ntn_organization: req.body.ntn_organization,
    name_owner_organization: req.body.name_owner_organization,
    url_website_organization: req.body.url_website_organization,
    phone_organization: req.body.phone_organization,
    email_organization: req.body.email_organization,

    is_enable_organization: 1,
  };
  db.organization_defination
    .create(desgn)
    .then(async (data) => {
      // let body = {};
      // const companyDef = {
      //   organization_id: data.id_organization,
      //   name_company: "dummy",
      //   note_company: "dummy",

      //   is_organization: 1,

      //   is_enable_company: 1,
      // };
      // let company = await db.company_defination.create(companyDef);
      // const unit = {
      //   company_id: company.id_company,
      //   name_unit: "dummy",
      //   code_unit: "dummy",
      //   note_unit: "dummy",

      //   is_enable_unit: 1,
      // };
      // let detail = await db.unit.create(unit);
      // body.organization = data;
      // body.company = company;
      // body.unit = detail;
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "company def cant be created",
      });
    });
};

exports.findById = async (req, res) => {
  db.organization_defination
    .findOne({
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
      where: { id_organization: req.params.id },
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

exports.getAll = async (req, res) => {
  db.organization_defination
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
    })
    .then(async (organization_data) => {
      // let detail = [];
      // secret;
      // for (let i = 0; i < organization_data.length; i++) {
      //   let orgDetail = new Object();
      //   orgDetail.organizationDetail = organization_data[i];
      //   let company = await db.company_defination.findOne({
      //     where: {
      //       organization_id: organization_data[i].id_organization,
      //       is_organization: 1,
      //     },
      //   });
      //   if (company) {
      //     // let values = await db.custom_value.findAll({
      //     //   where: { company_id: company.id_company },
      //     // });
      //     // orgDetail.customValues = values;
      //     let unit = await db.unit.findOne({
      //       where: { company_id: company.id_company },
      //     });

      //     let location = await db.location.findOne({
      //       where: { unit_id: unit.id_unit },
      //     });
      //     if (location) {
      //       const locations = await axios
      //         .get(
      //           `https://hrms-backend.azurewebsites.net/api/location/findById/${location.id_location}`
      //         )
      //         .catch((e) => {
      //           return res.send(e);
      //         });
      //       orgDetail.location = locations.data;
      //     }
      //   }

      //   detail.push(orgDetail);
      // }
      res.send(organization_data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no organization ",
      });
    });
};

exports.update = async (req, res) => {
  const id = req.params.id;

  db.organization_defination
    .update(req.body, {
      where: { id_organization: id },
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

  db.organization_defination
    .update(
      { is_enable_organization: 0 },
      {
        where: { id_organization: id },
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

  db.organization_defination
    .update(
      { is_enable_organization: 1 },
      {
        where: { id_organization: id },
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
