'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('access_tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      client_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: 'oauth_clients',
          key: 'id'
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      access_token: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      access_token_expires_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      redirect_uri: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      scopes: {
        allowNull: false,
        defaultValue: ['read'],
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      refresh_token: {
        type: Sequelize.TEXT
      },
      refresh_token_expires_at: {
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('access_tokens');
  }
};
