module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('order', 'orderStatus', {
      allowNull: false,
      type: Sequelize.ENUM('SUCCESS', 'FAILED'),
    }),
  ]),
  down: queryInterface => Promise.all([
    queryInterface.removeColumn('order', 'orderStatus'),
  ]),
};
