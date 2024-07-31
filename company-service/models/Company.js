const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Company = sequelize.define('Company', {
    companyId:{
        type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Company;
