const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Job = sequelize.define('Job', {
  jobId:{
    type: DataTypes.INTEGER,
      primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id:{
    type: DataTypes.INTEGER,
    allowNull: false,

  },
  salaryMin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salaryMax: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  experience: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
});

module.exports = Job;
