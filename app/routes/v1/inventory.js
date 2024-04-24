const head = require('lodash/head');
const get = require('lodash/get');
const { wrap } = require('../../helpers');
const { Inventory } = require('../../action/v1/inventory');

const getListApi = async (req) => {
  req
    .checkQuery('limit')
    .not()
    .isEmpty()
    .withMessage('limit is required')
    .customSanitizer((value) => Number(value));

  req
    .checkQuery('sort')
    .not()
    .isEmpty()
    .withMessage('sort is required (asc, desc)')
    .isIn(['asc', 'desc'])
    .trim()
    .escape()
    .customSanitizer((value) => String(value));

  const errors = req.validationErrors();

  if (errors) {
    throw Object.assign(new Error('Validation Errors'), { data: head(errors) });
  }

  const limit = get(req, 'query.limit');
  const sort = get(req, 'query.sort');
  const requestId = get(req, 'requestId');

  const result = await Inventory.getListProduct({
    limit,
    sort,
    requestId,
  });

  return result;
};

module.exports = (router) => {
  router.get('/list', wrap(getListApi));
};
