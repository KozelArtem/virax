const { student: studentSvc, company: companySvc } = require('../services');

module.exports = {
  loadStudent: async (req, res, next) => {
    const student = await studentSvc.getByUserId(req.user.id);

    if (!student) {
      res.status(404).send({ message: 'User not found' });

      return;
    }

    res.student = student;
    next();
  },

  loadCompany: async (req, res, next) => {
    const company = await companySvc.getByUserId(req.user.id);

    if (!company) {
      res.status(404).send({ message: 'User not found' });

      return;
    }

    req.company = company;

    next();
  },
};
