module.exports = (sequelize, Sequelize) => {
    const file = sequelize.define("file", {
      name: {
        type: Sequelize.STRING
      },
      paid: {
        type: Sequelize.BOOLEAN
      },
      amount: {
        type: Sequelize.FLOAT
      },
      filetype: {
        type: Sequelize.STRING
      },
      duedate: {
        type: Sequelize.DATE
      }
    });

    file.associate = function (models) {
        file.belongsTo(
          models.user,
          {
              foreignKey: 'userid'
          }
        );
        file.belongsTo(
            models.folder,
            {
                foreignKey: 'folderid'
            }
        );
          file.belongsTo(
            models.company,
            {
                foreignKey: 'companyid'
            }
          );
      }
  
    return file;
  };