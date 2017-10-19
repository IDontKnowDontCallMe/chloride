module.exports = function(sequelize, DataTypes) {


    var Tag = sequelize.define("Tag", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        usingNum: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }

    });

    Tag.associate = function(models) {

        Tag.belongsToMany(models.Album, {as:'albums', through:'album_tag', foreignKey:'tagId', otherKey:'albumId'});

    }

    return Tag;
};