const router = require('express').Router();

const loader = require('../../middleware/loader');

const { loadCompany } = loader;

const ctrl = require('../../controllers/vacancy');

router.get('/', ctrl.getList);
router.get('/:vacancyId', ctrl.getById);

router.post('/', loadCompany, ctrl.create);
router.put('/:vacancyId', loadCompany, ctrl.update);


// router.get('/vacancy/:vacancyId/favorite');

// router.get('/vacancy/:vacancyId/offers');

module.exports = router;
