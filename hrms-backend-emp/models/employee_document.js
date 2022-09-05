const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employee_document', {
    employee_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'employee_info',
        key: 'id_employee_info'
      }
    },
    document_type_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'document_type',
        key: 'id_document_type'
      }
    },
    id_employee_document: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    title_employee_document: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description_employee_document: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    url_employee_document: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    is_enable_employee_document: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'employee_document',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_employee_document" },
        ]
      },
      {
        name: "fk_employee_document_document_type",
        using: "BTREE",
        fields: [
          { name: "document_type_id" },
        ]
      },
      {
        name: "fk_employee_document_employee_info",
        using: "BTREE",
        fields: [
          { name: "employee_id" },
        ]
      },
    ]
  });
};
