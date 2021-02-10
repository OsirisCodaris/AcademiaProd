/* jshint indent: 2 */
const config = require('../config/config')

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
        allowNull: true,
      },
      file: {
        type: 'TEXT',
        allowNull: true,
        get() {
          return this.getDataValue('file') != null
            ? `${config.URL_READ_FORUM_FILE}/${this.getDataValue('file')}`
            : null
        },
      },
      status: {
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
        allowNull: true,
        references: {
          model: {
            tableName: 'teachers',
          },
          key: 'idteachers',
        },
      },
      idsubjectshasclasses: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: {
            tableName: 'subjects_has_classes',
          },
          key: 'idsubjectshasclasses',
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
    Problem.belongsTo(models.subjectsHasClasses, {
      foreignKey: 'idsubjectshasclasses',
    })
  }
  return Problem
}
