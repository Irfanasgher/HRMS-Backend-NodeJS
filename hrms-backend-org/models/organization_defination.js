const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "organization_defination",
    {
      id_organization: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      name_organization: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      is_enable_organization: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      code_organization: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      note_organization: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      phone_organization: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      email_organization: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      url_website_organization: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      url_logo_organization: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      name_owner_organization: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },

      ntn_organization: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      legal_name_organization: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "organization_defination",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_organization" }],
        },
      ],
    }
  );
};
