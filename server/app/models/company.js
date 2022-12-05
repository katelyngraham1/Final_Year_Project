module.exports = (sequelize, DataTypes) => {
    var company = sequelize.define("company", {
      name: {
        type: DataTypes.STRING
      }      
    });

    company.associate = function (models) {
        company.belongsTo(
          models.user,
          {
              foreignKey: 'userid'
          }
        );
        company.hasMany(
            models.file,
            {
                foreignKey: 'fileid'
            }
          );
      };
  
    return company;
  };