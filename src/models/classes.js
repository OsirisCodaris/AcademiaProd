/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define(
    'Classes',
    {
      idclasses: {
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
      tableName: 'classes',
      timestamps: false,
    }
  )
  Class.associate = (models) => {
    // associations can be defined here
    Class.hasMany(models.Students, {
      foreignKey: 'idclasses',
    })

    Class.belongsToMany(models.Subjects, {
      through: models.subjectsHasClasses,
      foreignKey: 'idclasses',
    })
    Class.hasMany(models.subjectsHasClasses, {
      foreignKey: 'idclasses',
      as: 'classesSubjects',
    })
  }
  return Class
}
