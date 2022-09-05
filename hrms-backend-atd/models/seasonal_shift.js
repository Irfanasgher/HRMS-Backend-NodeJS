const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "seasonal_shift",
    {
      id_seasonal_shift: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      name_seasonal_shift: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      code_seasonal_shift: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      start_date_seasonal_shift: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date_seasonal_shift: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      note_seasonal_shift: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      is_enable_seasonal_shift: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "seasonal_shift",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_seasonal_shift" }],
        },
      ],
    }
  );
};
