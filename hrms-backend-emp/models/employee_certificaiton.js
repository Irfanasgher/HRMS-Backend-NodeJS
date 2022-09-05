const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employee_certificaiton', {
    id_employee_certification: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    certificaiton_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'certifications',
        key: 'id_certification'
      }
    },
    employee_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'employee_info',
        key: 'id_employee_info'
      }
    },
    completed_on_employee_certification: {
      type: DataTypes.DATE,
      allowNull: false
    },
    valid_till_employee_certificaiton: {
      type: DataTypes.DATE,
      allowNull: true
    },
    result_employee_certificaiton: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    identification_employee_certification: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    is_enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'employee_certificaiton',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_employee_certification" },
        ]
      },
      {
        name: "fk_employee_certificaiton_certifications",
        using: "BTREE",
        fields: [
          { name: "certificaiton_id" },
        ]
      },
      {
        name: "fk_employee_certificaiton_employee_info",
        using: "BTREE",
        fields: [
          { name: "employee_id" },
        ]
      },
    ]
  });
};
