const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');


User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasOne(Comment, {
  foreignKey: 'user_id',
});

Blog.hasOne(Comment, {
  foreignKey: 'blog_id',
});

Blog.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Blog, Comment };
