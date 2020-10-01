/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Problem = sequelize.define(
    'Problems',
    {
      idproblems: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: 'LONGTEXT',
        allowNull: false,
      },
      state: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
      },
      idstudents: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: {
            tableName: 'students',
          },
          key: 'idstudents',
        },
      },
      idteachers: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: {
            tableName: 'teachers',
          },
          key: 'idteachers',
        },
      },
    },
    {
      sequelize,
      tableName: 'problems',
    }
  )
  Problem.associate = (models) => {
    // associations can be defined here
    Problem.hasMany(models.Responses, {
      foreignKey: 'idproblems',
    })
    Problem.belongsTo(models.Students, {
      foreignKey: 'idstudents',
    })
    Problem.belongsTo(models.Teachers, {
      foreignKey: 'idteachers',
    })
  }
  return Problem
}
