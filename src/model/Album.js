module.exports = function(sequelize, DataTypes) {


    var Album = sequelize.define("photo", {
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
            values: [],
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
        Album.hasMany(models.Comment, {as:'albumComments',  foreignKey:'albumId'});
        Album.belongsToMany(models.User, {as:'starUsers', through:'album_starUser', foreignKey:'albumId', otherKey:'userId'});
        Album.belongsTo(models.User, {as:'author', foreignKey:'authorId'});
    }

    return Album;
};