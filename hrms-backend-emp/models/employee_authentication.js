const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employee_authentication', {
    id_employee_authenticaiton: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    employee_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'employee_info',
        key: 'id_employee_info'
      }
    },
    authentication_type_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'authentication_type',
        key: 'id_authentication_type'
      }
    },
    value_employee_authentication: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    is_enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'employee_authentication',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_employee_authenticaiton" },
        ]
      },
      {
        name: "fk_employee_authentication_authentication_type",
        using: "BTREE",
        fields: [
          { name: "authentication_type_id" },
        ]
      },
      {
        name: "fk_employee_authentication_employee_info",
        using: "BTREE",
        fields: [
          { name: "employee_id" },
        ]
      },
    ]
  });
};
