const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "permission_role",
    {
      id_permission_role: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      role_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: "role",
          key: "id_role",
        },
      },
      name_entity_permission_role: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      id_entity_permission_role: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      name_module_permission_role: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      is_viewonly_permission_role: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      is_update_permission_role: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      is_delete_permission_role: {
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
      tableName: "permission_role",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_permission_role" }],
        },
        {
          name: "fk_permission_role_Role",
          using: "BTREE",
          fields: [{ name: "role_id" }],
        },
      ],
    }
  );
};
