const db = require("../../models");

const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  if (req.body.grade_policy_group) {
    let gradeCheck = await db.policy_group.findOne({
      where: { grade_policy_group: req.body.grade_policy_group },
    });
    if (gradeCheck) {
      res.send({
        message: "grade already exists",
      });
    } else {
      const desgn = {
        name_policy_group: req.body.name_policy_group,
        grade_policy_group: req.body.grade_policy_group,
        is_benefit: req.body.is_benefit,

        is_enable: 1,
      };
      db.policy_group
        .create(desgn)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "company def cant be created",
          });
        });
    }
  } else {
    const desgn = {
      name_policy_group: req.body.name_policy_group,

      is_benefit: req.body.is_benefit,

      is_enable: 1,
    };
    db.policy_group
      .create(desgn)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "company def cant be created",
        });
      });
  }
};

exports.findById = async (req, res) => {
  db.policy_group
    .findOne({
      where: { id_policy_group: req.params.id },
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

exports.findAllPolicyGroups = async (req, res) => {
  db.policy_group
    .findAll({
      include: {
        model: db.mapping_policy_group,
        as: "mapping_policy_groups",
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
          ],
          //   {
          //     model: db.mapping_policy_group,
          //     as: "mapping_policy_groups",
          //     include: {
          //       model: db.policy_group,
          //       as: "policy_group",
          //     },
          //   },
          //   {
          //     model: db.policy_custom_field,
          //     as: "policy_custom_fields",
          //     include: [
          //       {
          //         model: db.policy_field_option,
          //         as: "policy_field_options",
          //       },
          //       {
          //         model: db.policy_custom_value,
          //         as: "policy_custom_values",
          //       },
          //     ],
          //   },
          // ],
        },
      },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no policy type of this name ",
      });
    });
};
exports.findenablepolicy = async (req, res) => {
  db.policy_group
    .findAll({ where: { is_enable: 1 } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no policy type of this name ",
      });
    });
};

exports.update = async (req, res) => {
  const id = req.params.id;

  db.policy_group
    .update(req.body, {
      where: { id_policy_group: id },
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

  db.policy_group
    .update(
      { is_enable: 0 },
      {
        where: { id_policy_group: id },
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

  db.policy_group
    .update(
      { is_enable: 1 },
      {
        where: { id_policy_group: id },
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
exports.forEmpModule = async (req, res) => {
  db.policy_group
    .findOne({
      include: [
        {
          model: db.mapping_policy_group,
          as: "mapping_policy_groups",
          include: [
            {
              model: db.policy_defination,
              as: "policy",
            },
          ],
        },
      ],
      where: { grade_policy_group: req.params.name },
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
exports.findBenefitGroup = async (req, res) => {
  db.policy_group
    .findAll({
      where: { is_benefit: 1 },
      include: {
        model: db.mapping_policy_group,
        as: "mapping_policy_groups",
        include: {
          model: db.policy_defination,
          as: "policy",
        },
      },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no policy type of this name ",
      });
    });
};
