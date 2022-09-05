const db = require("../../models");

const Op = db.Sequelize.Op;

exports.createPlan = async (req, res) => {
  let policy_type = await db.policy_type.findOne({
    where: { name_policy_type: "plan" },
  });
  const desgn = {
    policy_type: policy_type.id_policy_type,
    name_policy: req.body.name_policy,
    description_policy: req.body.description_policy,
    note_policy: req.body.note_policy,
    createdBy: req.body.createdBy,
    is_enable_policy: 1,
  };
  db.policy_defination
    .create(desgn)
    .then((data) => {
      const desgn1 = {
        policy_id: data.id_policy,
        code_factor: req.body.code_factor,
        target_factor: req.body.target_factor,
        period_factor: req.body.period_factor,
        start_period_factor: req.body.start_period_factor,
        end_peroid_factor: req.body.end_peroid_factor,
        adjustment_factor: req.body.adjustment_factor,
        value_factor: req.body.value_factor,
        note_factor: req.body.note_factor,
        is_enable_factor: 1,
      };
      db.factor
        .create(desgn1)
        .then((data) => {})
        .catch((err) => {
          res.status(500).send({
            message: err.message || "company def cant be created",
          });
        });
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "company def cant be created",
      });
    });
};
exports.getAllPlans = async (req, res) => {
  let policy_type = await db.policy_type.findOne({
    where: { name_policy_type: "plan" },
  });
  db.policy_defination
    .findAll({ where: { policy_type: policy_type.id_policy_type } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no company id ",
      });
    });
};
exports.createPolicy = async (req, res) => {
  // let policy_type = await db.policy_type.findOne({
  //   where: { name_policy_type: "policy" },
  // });
  const desgn = {
    policy_type: req.body.policy_type,
    name_policy: req.body.name_policy,
    description_policy: req.body.description_policy,
    note_policy: req.body.note_policy,
    createdBy: req.body.createdBy,
    is_enable_policy: 1,
  };
  db.policy_defination
    .create(desgn)
    .then((data) => {
      const desgn1 = {
        policy_id: data.id_policy,
        code_factor: req.body.code_factor,
        target_factor: req.body.target_factor,
        period_factor: req.body.period_factor,
        start_period_factor: req.body.start_period_factor,
        end_peroid_factor: req.body.end_peroid_factor,
        adjustment_factor: req.body.adjustment_factor,
        value_factor: req.body.value_factor,
        note_factor: req.body.note_factor,
        is_enable_factor: 1,
      };
      db.factor
        .create(desgn1)
        .then((data) => {})
        .catch((err) => {
          res.status(500).send({
            message: err.message || "company def cant be created",
          });
        });
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "company def cant be created",
      });
    });
};

exports.getAllPolicies = async (req, res) => {
  // let policy_type = await db.policy_type.findOne({
  //   where: { name_policy_type: "policy" },
  // });
  db.policy_defination
    .findAll({
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

exports.findBycompany_id = async (req, res) => {
  db.policy_defination
    .findAll({ where: { company_id: req.params.id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no company id ",
      });
    });
};
exports.findByPolicyIds = async (req, res) => {
  db.policy_defination
    .findAll({
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
      where: { id_policy: req.body.arr },
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
exports.findByPolicyId = async (req, res) => {
  db.policy_defination
    .findOne({
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
      where: { id_policy: req.params.id },
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

  db.policy_defination
    .update(req.body, {
      where: { id_policy: id },
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

  db.policy_defination
    .update(
      { is_enable_policy: 0 },
      {
        where: { id_policy: id },
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

  db.policy_defination
    .update(
      { is_enable_policy: 1 },
      {
        where: { id_policy: id },
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
