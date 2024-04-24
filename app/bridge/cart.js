/* eslint-disable import/no-extraneous-dependencies */
const { Op } = require('sequelize');
const { Cart, Order } = require('../db/models/Mysql/fakestore/index');
const { wrapFunc } = require('../helpers');

const defaultErrorMessage = 'Operation Failed: Cart';

const getAllCart = async ({
  startDate,
  endDate,
  searchTerm,
  orderBy,
  sort,
  limit,
  page,
}) => {
  const condition = [];
  if (startDate && endDate) {
    condition.push({ createdAt: { [Op.between]: [startDate, endDate] } });
  }
  if (searchTerm) {
    condition.push({
      [Op.or]: [{ trxStatus: { [Op.eq]: searchTerm } }],
      [Op.or]: [{ referenceId: { [Op.eq]: searchTerm } }],
    });
  }

  const where = {
    [Op.and]: condition,
  };

  const query = {
    order: [[orderBy || 'createdAt', sort || 'DESC']],
    limit: limit ? parseFloat(limit) : 10,
    offset:
      parseFloat(limit ? parseFloat(limit) : 10) *
      ((parseFloat(page || 1) || 1) - 1),
    where,
    include: [
      {
        model: Order,
      },
    ],
  };

  const result = await Cart.findAndCountAll(query);
  return result;
};

const updateCart = ({ id, data }) =>
  Cart.update({ ...data }, { where: { id } });

const createCart = (data) =>
  Cart.create(data);

const findByRefId = ({ referenceId }) => Cart.findOne({
  where: {
    referenceId,
  },
});

module.exports = {
  getAllCart: ({
    startDate,
    endDate,
    searchTerm,
    orderBy,
    sort,
    limit,
    page,
  }) =>
    wrapFunc(
      getAllCart({
        startDate,
        endDate,
        searchTerm,
        orderBy,
        sort,
        limit,
        page,
      }),
      defaultErrorMessage
    ),
  updateCart: ({ id, data }) =>
    wrapFunc(updateCart({ id, data }), defaultErrorMessage),
  createCart: (data) =>
    wrapFunc(
      createCart(data),
      defaultErrorMessage
    ),
  findByRefId: (data) =>
    wrapFunc(
      findByRefId(data),
      defaultErrorMessage
    ),
};
