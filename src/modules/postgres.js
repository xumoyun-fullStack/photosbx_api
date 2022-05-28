const { Sequelize } = require("sequelize");
const UserModel = require("../models/UserModel");
const PhotosModel = require("../models/PhotosModel");
const CommentModel = require("../models/CommentsModel");
const ReactionsModel = require("../models/ReactionsModel");
const SessionsModel = require("../models/SessionModel");
const { DB_URL } = require("../../config");

const sequelize = new Sequelize(DB_URL);

module.exports = async function(){
    try{
        const db = {};

        db.users = await UserModel(Sequelize, sequelize);
        db.photos = await PhotosModel(Sequelize, sequelize);
        db.comments = await CommentModel(Sequelize, sequelize);
        db.reactions = await ReactionsModel(Sequelize, sequelize);
        db.sessions = await SessionsModel(Sequelize, sequelize);

        db.users.hasMany(db.photos, {
            foreignKey: {
                name: "user_id",
                allowNull: false,
            }
        });

        db.photos.belongsTo(db.users, {
            foreignKey: {
                name: "user_id",
                allowNull: false,
            }
        });

        db.users.hasMany(db.comments), {
            foreignKey: {
                name: "user_id",
                allowNull: false,
            }
        };

        db.comments.belongsTo(db.users,{
            foreignKey: {
                name: "user_id",
                allowNull: false,
            }
        });

        db.photos.hasMany(db.reactions, {
            foreignKey:{
                name: "photo_id",
                allowNull: false
            }
        });

        db.reactions.belongsTo(db.photos, {
            foreignKey: {
                name: "photo_id",
                allowNull: false
            }
        })

        db.users.hasMany(db.sessions, {
            foreignKey: {
                name: "user_id",
                allowNull: false,
            }
        });

        db.sessions.belongsTo(db.users, {
            foreignKey:{
                name: "user_id",
                allowNull: false,
            }
        })

        db.photos.hasMany(db.comments, {
            foreignKey: {
                name: "photo_id",
                allowNull: false
            }
        });

        db.comments.belongsTo(db.photos, {
            foreignKey: {
                name: "photo_id",
                allowNull: false
            }
        });

        sequelize.sync({alter: false});

        return db;
    }catch(e){
        console.log( e);
    }
}