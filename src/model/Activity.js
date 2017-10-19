module.exports = function(sequelize, DataTypes) {


    var Activity = sequelize.define("Activity", {
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
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: '无'
        },
        startAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        //createdAt field by default

        maxPeople: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },

        registeredPeople: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },

        isFinished: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }


    });

    Activity.associate = function(models) {

        Activity.belongsTo(models.User, {as:'author', foreignKey:'authorId'});
        Activity.belongsToMany(models.User, {as:'actors', through: 'activity_actor', foreignKey:'activityId', otherKey:'userId'});

    }

    return Activity;
};