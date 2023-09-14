const { Sequelize } = require('sequelize');
 const sequelize = new Sequelize('sqlite::memory:');

module.exports = (sequelize, DataTypes) => {
 const User = sequelize.define('User', {
  // Model attributes are defined here
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
},
  name: {
    type: DataTypes.STRING,
    //allowNull: false,
  },
    email: {
    type: DataTypes.STRING,
    allowNull: false,
 //   unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:false,
  },
  image: {
    type: DataTypes.STRING,
   // allowNull: false,
  },
  is_admin: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:false,
  },
  is_verified: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:false,

  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue:false,
  },
  last_login: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:false,

  },
  resetToken: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:false,
},
}, {
  //  tableName:'User'
});
return User;
}

  