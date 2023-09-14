require('dotenv').config()
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME } = process.env
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: false
})

try {
    sequelize.authenticate()
    console.log("Connection has been establised successfully with DataBase...!")
} catch (error) {
    console.error("Unable to connect to the database", error)
}

const db = {}
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize.sync({ alter: true});

db.User = require("../model/register.model")(sequelize, DataTypes);
// db.userDetails = require("../model/userDetails")(sequelize, DataTypes);
// db.userProfile = require("../model/userProfile.model")(sequelize,DataTypes);
// // db.UserCategory = require("./category.model")(sequelize,DataTypes);

// db.User.hasMany(db.userDetails,{foreignkey:'UserId',as :'userDetails'});
// db.userDetails.belongsTo(db.User,{foreignkey:'UserId',as :'User'});

// db.User.hasMany(db.userProfile,{foreignkey:'UserId',as:'userProfile'});
// db.userProfile.belongsTo(db.User,{foreignkey:'UserId',as :'User'});

module.exports=db;