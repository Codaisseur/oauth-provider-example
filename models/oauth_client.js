'use strict';
module.exports = (sequelize, DataTypes) => {
  var oauth_client = sequelize.define('oauth_client', {
    client_id: DataTypes.TEXT,
    client_secret: DataTypes.TEXT,
    name: DataTypes.STRING,
    website_url: DataTypes.TEXT,
    logo: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    redirect_uris: DataTypes.ARRAY(DataTypes.TEXT)
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        oauth_client.belongsTo(models.user, {
          onDelete: 'CASCADE',
          foreignKey: 'user_id',
          as: 'resource_owner'
        });

        oauth_client.hasMany(models.authorization_code, {
          foreignKey: 'client_id',
          as: 'authorization_codes'
        });

        oauth_client.hasMany(models.access_token, {
          foreignKey: 'client_id',
          as: 'access_tokens'
        });
      }
    }
  });
  return oauth_client;
};
