module.exports = function(sequelize, DataTypes) {


    var Photo = sequelize.define("Photo", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        origin: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        simg: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        mimg: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        bimg: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },


    });

    Photo.associate = function(models) {
        Photo.belongsTo(models.Album, {as: 'album', foreignKey:'albumId'});
    }

    return Photo;
};