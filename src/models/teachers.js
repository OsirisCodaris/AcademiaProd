/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define(
    'Teachers',
    {
      idteachers: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'idusers',
        },
      },
      city: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      phone2: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      tutor: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
      },
      classes: {
        type: 'LONGTEXT',
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'teachers',
      timestamps: false,
    }
  )
  Teacher.associate = (models) => {
    // associations can be defined here
    Teacher.belongsTo(models.Users, {
      foreignKey: 'idteachers',
    })
    Teacher.belongsTo(models.Subjects, {
      foreignKey: 'idsubjects',
      unique: false,
    })
    Teacher.belongsToMany(models.Users, {
      through: 'teachersLikes',
      as: 'userLikes',
      foreignKey: 'idteachers',
      otherKey: 'idusers',
    })
    Teacher.hasMany(models.Problems, {
      foreignKey: 'idteachers',
    })
  }
  return Teacher
}
