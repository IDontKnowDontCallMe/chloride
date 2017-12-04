module.exports = function(sequelize, DataTypes) {


    var User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: true,
        },
        popularity:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        activityValue: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 100,
        },

    });

    User.associate = function(models) {
        User.belongsToMany(models.User, { as: 'followings', through: 'follow_relations', foreignKey: 'followedId', otherKey: 'followingId' });
        User.belongsToMany(models.User, { as: 'followers', through: 'follow_relations', foreignKey: 'followingId', otherKey: 'followedId' });
        User.hasMany(models.Album,{as: 'albums', foreignKey:'authorId'});
        User.hasMany(models.Video,{as: 'videos', foreignKey:'authorId'});
        User.hasMany(models.Post,{as: 'posts', foreignKey:'authorId'});
        User.hasMany(models.Activity,{as: 'activities', foreignKey:'authorId'});
        User.belongsToMany(models.Activity,{as: 'actingActivities', through: 'activity_actor', foreignKey:'userId', otherKey:'activityId'});
    }

    return User;
};