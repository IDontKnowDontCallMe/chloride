module.exports = function(sequelize, DataTypes) {


    var Video = sequelize.define("Video", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },


        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,

        },

        origin: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '/false',
        },

        //0: be not transformed; 1: completed
        state: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }




    });

    Video.associate = function(models) {
        Video.belongsTo(models.User, {as: 'author', foreignKey:'authorId'});
    }

    return Video;
};