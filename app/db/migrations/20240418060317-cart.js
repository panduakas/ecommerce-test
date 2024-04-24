module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('cart', {
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: Sequelize.STRING,
    },
    referenceId: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    trxStatus: {
      allowNull: false,
      type: Sequelize.ENUM('ONPROCESS', 'SUCCESS', 'FAILED'),
    },
    failureReason: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
  }),
  down: queryInterface => queryInterface.dropTable('cart'),
};
