'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        user.hasMany(models.oauth_client, {
          foreignKey: 'user_id',
          as: 'oauth_clients'
        });

        user.hasMany(models.authorization_code, {
          foreignKey: 'user_id',
          as: 'authorization_codes'
        });
      }
    }
  });
  return user;
};
