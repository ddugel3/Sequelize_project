const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  username: 'root',
  password: '00000000',
  database: 'database_development',
  host: '127.0.0.1',
  dialect: 'mysql',
});

// Define models for each table
const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  nickname: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  phone: DataTypes.STRING,
  name: DataTypes.STRING,
  birth: DataTypes.DATE,
});

const Following = sequelize.define('Following', {
  followers_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  my_id: DataTypes.INTEGER,
  following_user_id: DataTypes.INTEGER,
});

const Mypage = sequelize.define('Mypage', {
  mypage_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  profileImage_url: DataTypes.STRING,
  introduction: DataTypes.STRING,
});

const Declaration = sequelize.define('Declaration', {
  declaration_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  content: DataTypes.STRING,
  whistleblower_id: DataTypes.INTEGER,
  perpetrator_id: DataTypes.INTEGER,
});

const GoodsCategory = sequelize.define('GoodsCategory', {
  goods_category_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  content: DataTypes.STRING,
});

const Goods = sequelize.define('Goods', {
  goods_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  contents: DataTypes.STRING,
  price: DataTypes.INTEGER,
  soldout: DataTypes.BOOLEAN,
});

const GoodsImage = sequelize.define('GoodsImage', {
  goods_image_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  image_url: DataTypes.STRING,
});

const Review = sequelize.define('Review', {
  review_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  content: DataTypes.STRING,
});

const ReviewImage = sequelize.define('ReviewImage', {
  review_image_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  image_url: DataTypes.STRING,
});

const Transaction = sequelize.define('Transaction', {
  transaction_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

const ExhibitionCategory = sequelize.define('ExhibitionCategory', {
  exhibition_category_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  content: DataTypes.STRING,
});

const Exhibition = sequelize.define('Exhibition', {
  exhibition_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  introduction: DataTypes.STRING,
  contents: DataTypes.STRING,
  start_date: DataTypes.DATE,
  end_date: DataTypes.DATE,
  like_count: DataTypes.INTEGER,
});

const Like = sequelize.define('Like', {
  like_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

const ExhibitionImage = sequelize.define('ExhibitionImage', {
  exhibition_image_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  image_url: DataTypes.STRING,
});

const Guestbook = sequelize.define('Guestbook', {
  guestbook_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  content: DataTypes.STRING,
});

// Define relationships between models
User.hasMany(Following, { foreignKey: 'my_id' });
Following.belongsTo(User, { foreignKey: 'my_id' });
Following.belongsTo(User, { foreignKey: 'following_user_id' });

User.hasMany(Mypage, { foreignKey: 'user_id' });
Mypage.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Declaration, { foreignKey: 'whistleblower_id' });
Declaration.belongsTo(User, { foreignKey: 'whistleblower_id' });
Declaration.belongsTo(User, { foreignKey: 'perpetrator_id' });

User.hasMany(Goods, { foreignKey: 'user_id' });
Goods.belongsTo(User, { foreignKey: 'user_id' });
Goods.belongsTo(GoodsCategory, { foreignKey: 'goods_category_id' });

Goods.hasMany(GoodsImage, { foreignKey: 'goods_id' });
GoodsImage.belongsTo(Goods, { foreignKey: 'goods_id' });

User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });
Review.belongsTo(Goods, { foreignKey: 'goods_id' });

Review.hasMany(ReviewImage, { foreignKey: 'review_id' });
ReviewImage.belongsTo(Review, { foreignKey: 'review_id' });

User.hasMany(Transaction, { foreignKey: 'user_id' });
Transaction.belongsTo(User, { foreignKey: 'user_id' });
Transaction.belongsTo(Goods, { foreignKey: 'goods_id' });

User.hasMany(Exhibition, { foreignKey: 'user_id' });
Exhibition.belongsTo(User, { foreignKey: 'user_id' });
Exhibition.belongsTo(ExhibitionCategory, { foreignKey: 'exhibition_category_id' });

Exhibition.hasMany(Like, { foreignKey: 'exhibition_id' });
Like.belongsTo(Exhibition, { foreignKey: 'exhibition_id' });
Like.belongsTo(User, { foreignKey: 'user_id' });

Exhibition.hasMany(ExhibitionImage, { foreignKey: 'exhibition_id' });
ExhibitionImage.belongsTo(Exhibition, { foreignKey: 'exhibition_id' });

Exhibition.hasMany(Guestbook, { foreignKey: 'exhibition_id' });
Guestbook.belongsTo(Exhibition, { foreignKey: 'exhibition_id' });
Guestbook.belongsTo(User, { foreignKey: 'user_id' });

// Export the models and sequelize instance
module.exports = {
  sequelize,
  User,
  Following,
  Mypage,
  Declaration,
  GoodsCategory,
  Goods,
  GoodsImage,
  Review,
  ReviewImage,
  Transaction,
  ExhibitionCategory,
  Exhibition,
  Like,
  ExhibitionImage,
  Guestbook,
};
