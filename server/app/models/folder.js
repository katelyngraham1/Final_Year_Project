module.exports = (sequelize, Sequelize) => {
  const folder = sequelize.define("folder", {
    name: {
      type: Sequelize.STRING
    }      
  });

  folder.associate = function (models) {
    folder.belongsTo(
      models.user,
      {
          foreignKey: 'userid'
      }
    );
    folder.hasMany(
      models.file,
      {
          foreignKey: 'fileid'
      }
    );
  }

  return folder;
};