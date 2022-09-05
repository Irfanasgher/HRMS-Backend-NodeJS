const db = require("../../models");

const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const desgn = {
    company_id: req.body.company_id,
    policy_id: req.body.policy_id,

    is_enable: 1,
  };
  db.mapping_company_policy
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
  db.mapping_company_policy
    .findAll({
      include: [
        {
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
      ],
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

  db.mapping_company_policy
    .update(req.body, {
      where: { id_mapping_company_policy: id },
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

  db.mapping_company_policy
    .update(
      { is_enable: 0 },
      {
        where: { id_mapping_company_policy: id },
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

  db.mapping_company_policy
    .update(
      { is_enable: 1 },
      {
        where: { id_mapping_company_policy: id },
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
