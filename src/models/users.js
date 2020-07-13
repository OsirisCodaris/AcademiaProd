/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'Users',
    {
      idusers: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      fullname: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'users',
    }
  )
  User.associate = (models) => {
    // associations can be defined here
    User.hasOne(models.Subscribers, {
      foreignKey: 'idusers',
    })
    User.belongsToMany(models.Teachers, {
      through: 'teachersLikes',
      as: 'teacherLike',
      foreignKey: 'idusers',
      otherKey: 'idteachers',
    })
    User.belongsToMany(models.Documents, {
      through: 'documentsViews',
      as: 'docViews',
      foreignKey: 'idusers',
      otherKey: 'iddocuments',
    })
  }
  return User
}
