const router = require('express').Router();

router.get('/company/:companyId');
router.post('/company/:companyId');

router.get('/company/:companyId/vacancy');
router.post('/company/:companyId/vacancy');
router.put('/company/:companyId/vacancy');
router.delete('/company/:companyId/vacancy');

router.post('/company/:companyId/favorite');

module.exports = router;
