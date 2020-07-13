/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define(
    'Subjects',
    {
      idsubjects: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: 'subjects',
      timestamps: false,
    }
  )
  Subject.associate = (models) => {
    // associations can be defined here
    Subject.hasMany(models.Teachers, {
      foreignKey: 'idsubjects',
    })
    Subject.belongsToMany(models.Classes, {
      through: 'subjectsHasClasses',
      as: 'Classes',
      foreignKey: 'idsubjects',
      otherKey: 'idclasses',
    })
  }
  return Subject
}
