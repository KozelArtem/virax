'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      livingInfo: { 
        type: Sequelize.STRING 
      },
      birthday: {
        type: Sequelize.DATE,
      },
      rating: {
        type: Sequelize.INTEGER,
      },
      private: {
        type: Sequelize.BOOLEAN,
      },
      photoPath: {
        type: Sequelize.STRING,
      },
      personalDetails: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Students');
  },
};
