const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('leave_bank', {
    id_leave_bank: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name_leave_bank: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    code_leave_bank: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    note_leave_bank: {
      type: DataTypes.STRING(400),
      allowNull: true
    },
    total_day_leave_bank: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_enable_leave_bank: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'leave_bank',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_leave_bank" },
        ]
      },
    ]
  });
};
