const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "state",
    {
      country_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "country",
          key: "id_country",
        },
      },
      id_state: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      name_state: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      is_enable_state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "state",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_state" }],
        },
        {
          name: "fk_state_country",
          using: "BTREE",
          fields: [{ name: "country_id" }],
        },
      ],
    }
  );
};
