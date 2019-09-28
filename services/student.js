const { Student, UserContact } = require('../models');

module.exports = {
  getById: (id) => {
    return Student.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: [],
          include: {
            model: UserContact,
            as: 'contacts',
          },
        },
        {
          model: Skill,
          as: 'skills',
          attributes: ['id', 'name'],
          through: [],
        },
      ],
    });
  },
};
