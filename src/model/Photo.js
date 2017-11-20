module.exports = function(sequelize, DataTypes) {


    var Photo = sequelize.define("Photo", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        origin: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,

        },
        width: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        height: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        simg: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
        },
        mimg: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
        },
        bimg: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
        },


    });

    Photo.associate = function(models) {
        Photo.belongsTo(models.Album, {as: 'album', foreignKey:'albumId'});
    }

    return Photo;
};