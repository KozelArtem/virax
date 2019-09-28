'use strict';

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      'Roles',
      [
        { name: 'Admin', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Company', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Student', createdAt: new Date(), updatedAt: new Date() },
      ],
      {},
    ),

  down: (queryInterface) => queryInterface.bulkDelete('Roles', null, {}),
};
