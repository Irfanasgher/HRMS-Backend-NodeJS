const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "mapping_policy_group",
    {
      id_mapping_policy_group: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      policy_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "policy_defination",
          key: "id_policy",
        },
      },
      policy_group_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "policy_group",
          key: "id_policy_group",
        },
      },
      is_enable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "mapping_policy_group",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_mapping_policy_group" }],
        },
        {
          name: "fk_mapping_policy_group_policy_defination",
          using: "BTREE",
          fields: [{ name: "policy_id" }],
        },
        {
          name: "fk_mapping_policy_group_policy_group",
          using: "BTREE",
          fields: [{ name: "policy_group_id" }],
        },
      ],
    }
  );
};
