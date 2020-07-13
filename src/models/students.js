/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    'Students',
    {
      idstudents: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      sequelize,
      tableName: 'students',
      timestamps: false,
    }
  )
  Student.associate = (models) => {
    // associations can be defined here
    Student.belongsTo(models.Users, {
      foreignKey: 'idusers',
    })
    Student.belongsTo(models.Classes, {
      foreignKey: 'idclasses',
    })
    Student.hasMany(models.Problems, {
      foreignKey: 'idstudents',
    })
  }
  return Student
}
