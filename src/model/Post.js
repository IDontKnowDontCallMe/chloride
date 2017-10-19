module.exports = function(sequelize, DataTypes) {


    var Post = sequelize.define("post", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '无标题',
        },
        conntent: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: '<p> </p>'
        },

        //createdAt field by default
        //updatedAt field by default


    });

    Post.associate = function(models) {

        Post.hasMany(models.PostComment, {as:'comments', foreignKey:'postId'});
        Post.belongsTo(model.User, {as:'author', foreignKey:'authorId'});

    }

    return Post;
};