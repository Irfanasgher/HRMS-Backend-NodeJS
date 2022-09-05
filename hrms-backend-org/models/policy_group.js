const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "policy_group",
    {
      id_policy_group: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      name_policy_group: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      grade_policy_group: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      is_benefit: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      is_enable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "policy_group",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_policy_group" }],
        },
      ],
    }
  );
};
