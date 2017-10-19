module.exports = function(sequelize, DataTypes) {


    var Album = sequelize.define("Album", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '未命名',
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: '无',
        },
        theme: {
            type: DataTypes.ENUM,
            values: ['人像','风景','生态','纪实','生活','LOMO','观念','手机Snap','达物','宠物','美食','性感','其他'],
            allowNull: false,
            defaultValue: '风景',
        },
        star: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }



    });

    Album.associate = function(models) {
        Album.hasMany(models.Photo, {as:'photos', foreignKey:'albumId'});
        Album.belongsToMany(models.Tag, {as:'albumTags', through:'album_tag', foreignKey:'albumId', otherKey:'tagId'});
        Album.hasMany(models.AlbumComment, {as:'albumComments',  foreignKey:'albumId'});
        Album.belongsToMany(models.User, {as:'starUsers', through:'album_starUser', foreignKey:'albumId', otherKey:'userId'});
        Album.belongsTo(models.User, {as:'author', foreignKey:'authorId'});
    }

    return Album;
};