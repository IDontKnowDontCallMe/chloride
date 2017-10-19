module.exports = function(sequelize, DataTypes) {


    var Notification = sequelize.define("Notification", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type: {
            //[1:关注的人发相册，2:关注的人发帖子，3:关注的人发活动，4:相册被评论，5:帖子被评论，6:帖子评论被评论，7:活动被人参加，8:参加的活动被踢]
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        makerId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        receiverId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        itemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }


        //createdAt field by default


    });

    Notification.associate = function(models) {

        Notification.belongsTo(models.User, {as:'maker', foreignKey:'makerId'});
        Notification.belongsTo(models.User, {as:'receiver', foreignKey:'receiverId'});

    }


    return Notification;
};