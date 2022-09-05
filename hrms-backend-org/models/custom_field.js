const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "custom_field",
    {
      custom_form_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "custom_form",
          key: "id_custom_form",
        },
      },
      id_custom_field: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      name_custom_field: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      type_custom_field: {
        type: DataTypes.ENUM("number", "text", "email", "list", "file"),
        allowNull: false,
        defaultValue: "text",
      },
      is_enable: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
      },
      is_required: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "custom_field",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_custom_field" }],
        },
        {
          name: "fk_custom_form_id",
          using: "BTREE",
          fields: [{ name: "custom_form_id" }],
        },
      ],
    }
  );
};
