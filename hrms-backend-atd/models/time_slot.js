const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "time_slot",
    {
      seasonal_shift_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: "seasonal_shift",
          key: "id_seasonal_shift",
        },
      },
      regular_shift_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: "regular_shift",
          key: "id_regular_shift",
        },
      },
      id_time_slot: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      start_time_slot: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      end_time_slot: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      early_factor_time_slot: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      late_factor_time_slot: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      grace_factor_overtime_time_slot: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_over_time_slot: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      note_time_slot: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      is_enable_time_slot: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "time_slot",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_time_slot" }],
        },
        {
          name: "fk_time_slot_seasonal_shift",
          using: "BTREE",
          fields: [{ name: "seasonal_shift_id" }],
        },
        {
          name: "fk_time_slot_regular_shift",
          using: "BTREE",
          fields: [{ name: "regular_shift_id" }],
        },
      ],
    }
  );
};
