const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "factor",
    {
      policy_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "policy_defination",
          key: "id_policy",
        },
      },
      id_factor: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      code_factor: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      target_factor: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      period_factor: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      start_period_factor: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      end_peroid_factor: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      adjustment_factor: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      value_factor: {
        type: DataTypes.DECIMAL(18, 4),
        allowNull: true,
      },
      note_factor: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      is_enable_factor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "factor",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_factor" }],
        },
        {
          name: "fk_policy_defination_factor",
          using: "BTREE",
          fields: [{ name: "policy_id" }],
        },
      ],
    }
  );
};
