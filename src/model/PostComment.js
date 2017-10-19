module.exports = function(sequelize, DataTypes) {


    var PostComment = sequelize.define("postComment", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        conntent: {
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
        PostComment.belongsTo(models.Post, {as:'post'})

    }

    return PostComment;
};