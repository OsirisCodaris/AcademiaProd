/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'problems_has_notions_has_subjects_has_classes',
    {
      idproblems: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        references: {
          model: {
            tableName: 'problems',
          },
          key: 'idproblems',
        },
      },
      idnotions: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        references: {
          model: {
            tableName: 'notions_has_subjects_has_classes',
          },
          key: 'notions_idnotions',
        },
      },
      idsubjects: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        references: {
          model: {
            tableName: 'notions_has_subjects_has_classes',
          },
          key: 'idsubjects',
        },
      },
      idclasses: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        references: {
          model: {
            tableName: 'notions_has_subjects_has_classes',
          },
          key: 'idclasses',
        },
      },
    },
    {
      sequelize,
      tableName: 'problems_has_notions_has_subjects_has_classes',
      timestamps: false,
    }
  )
}
