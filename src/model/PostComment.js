module.exports = function(sequelize, DataTypes) {


    var PostComment = sequelize.define("PostComment", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: '<p> </p>'
        },
        to: {
            type: DataTypes.INTEGER,

        }

        //createdAt field by default
        //updatedAt field by default


    });

    PostComment.associate = function(models) {

        PostComment.belongsTo(models.User, {as:'author'});
        PostComment.belongsTo(models.Post, {as:'post', foreignKey:'postId'})

    }

    return PostComment;
};