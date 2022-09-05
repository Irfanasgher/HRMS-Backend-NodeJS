const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('machine_log', {
    punch_machine_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'punch_machine',
        key: 'id_punch_machine'
      }
    },
    employee_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "employee id will be retrieved from employee api service"
    },
    id_machine_log: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    punch_time_machine_log: {
      type: DataTypes.TIME,
      allowNull: false
    },
    punch_date_machine_log: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    is_synced_machine_log: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'machine_log',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_machine_log" },
        ]
      },
      {
        name: "fk_machine_log_punch_machine",
        using: "BTREE",
        fields: [
          { name: "punch_machine_id" },
        ]
      },
    ]
  });
};
