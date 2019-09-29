const { vacancy: vacancySvc } = require('../services');

const getList = async (req, res) => {
  try {
    const vacancies = await vacancySvc.getList();

    res.send(vacancies || []);
  } catch (err) {
    console.log(err);

    res
      .status(500)
      .send({ message: 'Something went wrong. Please try again later' });
  }
};

const getById = async (req, res) => {
  try {
    const vacancy = await vacancySvc.getById(req.params.vacancyId);

    res.send(vacancy || {});
  } catch (err) {
    console.log(err);
    
    res
      .status(500)
      .send({ message: 'Something went wrong. Please try again later' });
  }
};

const create = async (req, res) => {
  const { name, description, status, skills } = req.body;

console.log(skills);


  try {
    const vacancy = await vacancySvc.create({
      name,
      description,
      status,
      companyId: req.company.id,
    }, skills);

    res.send(vacancy || {});
  } catch (err) {
    console.log(err);
    
    res
      .status(500)
      .send({ message: 'Something went wrong. Please try again later' });
  }
};

const update = async (req, res) => {
  const { name, description, status } = req.body;

  try {
    const vacancy = await vacancySvc.updateById(
      req.params.vacancyId,
      req.company.id,
      {
        name,
        description,
        status,
      },
    );

    res.send(vacancy || {});
  } catch (err) {
    console.log(err);

    res
      .status(500)
      .send({ message: 'Something went wrong. Please try again later' });
  }
};

module.exports = {
  getList,
  getById,
  create,
  update,
};
