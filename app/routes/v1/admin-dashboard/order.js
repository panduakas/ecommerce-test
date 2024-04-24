const get = require('lodash/get');
const { wrap } = require('../../../helpers');

const { getAllCart } = require('../../../bridge/cart');

const getListApi = async (req) => {
  const startDate = get(req, 'query.startDate');
  const endDate = get(req, 'query.endDate');
  const searchTerm = get(req, 'query.searchTerm');
  const orderBy = get(req, 'query.orderBy');
  const sort = get(req, 'query.sort');
  const limit = get(req, 'query.limit');
  const page = get(req, 'query.page');

  const result = await getAllCart({
    startDate,
    endDate,
    searchTerm,
    orderBy,
    sort,
    limit,
    page,
  });

  return result;
};

module.exports = (router) => {
  router.get('/list', wrap(getListApi));
};
