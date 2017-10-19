module.exports = function(sequelize, DataTypes) {


    var AlbumComment = sequelize.define("albumComment", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        conntent: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: '无'
        },

        //createdAt field by default


    });

    AlbumComment.associate = function(models) {

        AlbumComment.belongsTo(models.Album, {as:'album', foreignKey:'albumId'});
        AlbumComment.belongsTo(models.User, {as:'author', foreignKey:'authorId'});

    }

    return AlbumComment;
};