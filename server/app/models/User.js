module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define("user", {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  });

  user.associate = function (models) {
      user.hasMany(
          models.folder,
          {
              foreignKey: 'userid'
          }
        );
        user.hasMany(
          models.company,
          {
              foreignKey: 'userid'
          }
        );
        user.hasMany(
          models.file,
          {
              foreignKey: 'userid'
          }
        );
    }
  return user;
};