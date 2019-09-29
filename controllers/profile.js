const { student: studentSvc, company: companySvc } = require('../services');

const get = async (req, res) => {
  const roleId = req.user.roleId;
  let profile = {};

  try {
    if (roleId === 1) {
      profile = await studentSvc.getByUserId(req.user.id);
    } else if (roleId === 2) {
      profile = await companySvc.getByUserId(req.user.id);
    }

    res.send(profile || { roleId });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const createOrUpdate = async (req, res) => {
  const roleId = req.user.roleId;

  try {
    if (roleId === 1) {
      const {
        firstName,
        lastName,
        birthday,
        isPrivate: private,
        photoURL: photoPath,
        personalDetails,
        livingInfo,
        rating,
      } = req.body;

      profile = await studentSvc.createOrUpdateByUserId(req.user.id, {
        userId: req.user.id,
        firstName,
        lastName,
        birthday,
        private,
        photoPath,
        personalDetails,
        livingInfo,
        rating,
      });

      profile = await studentSvc.getById(profile.id);

      res.send(profile || { roleId });

      return;
    } else if (roleId === 2) {
      const { imagePath, name, description, address } = req.body;

      profile = await companySvc.createOrUpdateByUserId(req.user.id, {
        userId: req.user.id,
        name,
        description,
        imagePath,
        address,
      });

      profile = await companySvc.getById(profile.id);

      res.send(profile || { roleId });

      return;
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  get,
  createOrUpdate,
};
