module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('order', {
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: Sequelize.STRING,
    },
    cartId: {
      allowNull: false,
      type: Sequelize.STRING,
      references: {
        model: 'cart',
        key: 'id',
      },
    },
    productId: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    quantity: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    productPrice: {
      allowNull: false,
      type: Sequelize.DOUBLE,
    },
    totalPrice: {
      allowNull: false,
      type: Sequelize.DOUBLE,
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    description: {
      allowNull: false,
      type: Sequelize.TEXT,
    },
    image: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    category: {
      allowNull: false,
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
  down: queryInterface => queryInterface.dropTable('order'),
};
