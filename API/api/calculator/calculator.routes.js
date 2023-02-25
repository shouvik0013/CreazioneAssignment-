const router = require('express').Router();
const controller = require('./calculator.controller');
// const { checkQueryParams } = require('../../middlewares/checkQueryParams');
const { checkQueryParams } = require('../../middlewares/checkQueryParams');

router.get('/', checkQueryParams, controller.calculator);
module.exports = router;
