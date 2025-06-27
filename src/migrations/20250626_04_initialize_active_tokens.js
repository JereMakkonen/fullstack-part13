const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('active_tokens', {
      token: {
        type: DataTypes.TEXT,
        primaryKey: true,
      },
      created_at: {
        type: DataTypes.DATE
      },
      updated_at: {
        type: DataTypes.DATE
      }
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('active_tokens');
  },
}