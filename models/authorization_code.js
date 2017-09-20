'use strict';
module.exports = (sequelize, DataTypes) => {
  var authorization_code = sequelize.define('authorization_code', {
    client_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    authorization_code: DataTypes.TEXT,
    expires_at: DataTypes.DATE,
    redirect_uri: DataTypes.TEXT,
    scopes: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        authorization_code.belongsTo(models.user, {
          onDelete: 'CASCADE',
          foreignKey: 'user_id',
          as: 'resource_owner'
        });

        authorization_code.belongsTo(models.oauth_client, {
          onDelete: 'CASCADE',
          foreignKey: 'client_id',
          as: 'client'
        });
      }
    }
  });
  return authorization_code;
};
