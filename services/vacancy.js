const Promise = require('bluebird');
const { col, Op } = require('sequelize');

const { Vacancy, Company, Skill, sequelize } = require('../models');

module.exports = {
  getList: () => {
    return Vacancy.findAll({
      attributes: [
        [col('company.name'), 'companyName'],
        'name',
        'updatedAt',
        'id',
      ],
      include: {
        model: Company,
        as: 'company',
        attributes: [],
      },
    });
  },

  getById: (id) => {
    return Vacancy.findByPk(id, {
      where: { status: 'active' },
      include: [
        {
          model: Company,
          as: 'company',
        },
        {
          model: Skill,
          as: 'skills',
          through: {
            attributes: [],
          },
        },
      ],
    });
  },

  create: async (data, skills) => {
    const transaction = await sequelize.transaction();

    const vacancy = await Vacancy.create(data);

    if (!vacancy) {
      return null;
    }

    await Promise.each(skills, async (value) => {
      const skill = await Skill.findOrCreate({
        where: { name: value.name },
        defaults: { name: value.name },
        transaction,
      });

      await vacancy.addSkill(skill, { transaction });
    });

    await transaction.commit();

    return vacancy;
  },

  updateById: async (id, companyId, data) => {
    try {
      const vacancy = await Vacancy.findByPk(id);

      if (!vacancy || !vacancy.companyId !== companyId) {
        return null;
      }

      return vacancy.update(data);
    } catch (err) {
      throw err;
    }
  },

  search: async (search) => {
    return Vacancy.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.substring]: search,
            },
          },
          {
            description: {
              [Op.substring]: search,
            },
          },
        ],
        status: 'active',
      },
    });
  },
};
