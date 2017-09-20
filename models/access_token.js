'use strict';
module.exports = (sequelize, DataTypes) => {
  var access_token = sequelize.define('access_token', {
    client_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    access_token: DataTypes.TEXT,
    access_token_expires_at: DataTypes.DATE,
    refresh_token: DataTypes.TEXT,
    refresh_token_expires_at: DataTypes.DATE
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        access_token.belongsTo(models.user, {
          onDelete: 'CASCADE',
          foreignKey: 'user_id',
          as: 'resource_owner'
        });

        access_token.belongsTo(models.oauth_client, {
          onDelete: 'CASCADE',
          foreignKey: 'client_id',
          as: 'client'
        });
      }
    }
  });
  return access_token;
};
