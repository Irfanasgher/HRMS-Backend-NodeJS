const db = require("../../models");

const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  for (let i = 0; i < req.body.policy_id.length; i++) {
    const desgn = {
      policy_group_id: req.body.policy_group_id,
      policy_id: req.body.policy_id[i],

      is_enable: 1,
    };
    db.mapping_policy_group
      .create(desgn)
      .then((data) => {})
      .catch((err) => {
        res.status(500).send({
          message: err.message || "company def cant be created",
        });
      });
  }
  res.json({ message: "added" });
};

exports.findByGroupId = async (req, res) => {
  db.mapping_policy_group
    .findAll({
      where: {
        policy_group_id: req.params.id,
      },
    })
    .then(async (data) => {
      let deptId = [];
      for (let i = 0; i < data.length; i++) {
        deptId.push(data[i].policy_id);
      }
      let dept = await db.policy_defination.findAll({
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
        where: {
          id_policy: deptId,
        },
      });
      res.send(dept);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no company id ",
      });
    });
};
exports.findCompanyPolicies = async (req, res) => {
  let dept = await db.mapping_company_policy.findAll({
    where: {
      company_id: req.params.id,
    },
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
      ],
    },
  });
  res.send(dept);
};
exports.update = async (req, res) => {
  const id = req.params.id;

  db.mapping_policy_group
    .update(req.body, {
      where: { id_mapping_policy_group: id },
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

  db.mapping_policy_group
    .update(
      { is_enable: 0 },
      {
        where: { id_mapping_policy_group: id },
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

  db.mapping_policy_group
    .update(
      { is_enable: 1 },
      {
        where: { id_mapping_policy_group: id },
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
