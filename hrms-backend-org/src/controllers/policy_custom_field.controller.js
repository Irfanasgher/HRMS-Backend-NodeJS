const db = require("../../models");

const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const desgn = {
    policy_id: req.body.policy_id,
    name_policy_custom_field: req.body.name_policy_custom_field,
    type_policy_custom_field: req.body.type_policy_custom_field,
    is_required: req.body.is_required,

    is_enable: 1,
  };
  db.policy_custom_field
    .create(desgn)
    .then((data) => {
      const desgn1 = {
        policy_custom_field_id: data.id_policy_custom_field,
        name_policy_field_option: req.body.name_policy_field_option,

        is_enable: 1,
      };
      db.policy_field_option
        .create(desgn1)
        .then((data1) => {})
        .catch((err) => {
          res.status(500).send({
            message: err.message || "company def cant be created",
          });
        });
      const desgn2 = {
        policy_custom_field_id: data.id_policy_custom_field,
        entity_name: req.body.entity_name,
        entity_id: req.body.entity_id,
        entered_policy_custom_value: req.body.entered_policy_custom_value,

        is_enable: 1,
      };
      db.policy_custom_value
        .create(desgn2)
        .then((data2) => {})
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
