/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const teachersLike = sequelize.define(
    'teachersLikes',
    {
      idteachers: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        references: {
          model: {
            tableName: 'teachers',
          },
          key: 'idteachers',
        },
      },
      idusers: {
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
    },
    {
      sequelize,
      tableName: 'teachers_likes',
      timestamps: false,
    }
  )
  return teachersLike
}
