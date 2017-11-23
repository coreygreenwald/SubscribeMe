const Sequelize = require('sequelize'); 
const db = require('../_db').connection;
const crypto = require('crypto');

const User = db.define('user', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING
    },
    salt: {
      type: Sequelize.STRING
    },
    googleId: {
      type: Sequelize.STRING
    }
  })
  
  module.exports = User
  
  /**
   * instanceMethods
   */
  User.prototype.validatePassword = function (candidatePwd) {
    // console.log('this is the password in plain text', candidatePwd);
    // console.log('this is the sale', this.salt)
    let encryptedPassword = User.encryptPassword(candidatePwd, this.salt);
    // console.log('this is after encryption', encryptedPassword);
    return User.encryptPassword(candidatePwd, this.salt) === this.password
   
  }
  
  /**
   * classMethods
   */
  User.generateSalt = function () {
    return crypto.randomBytes(16).toString('base64')
  }
  
  User.encryptPassword = function (plainText, salt) {
    return crypto.createHash('RSA-SHA256').update(plainText).update(salt).digest('hex')
  }
  
  const setSaltAndPassword = user => {
    if (user.changed('password')) {
      user.salt = User.generateSalt()
      user.password = User.encryptPassword(user.password, user.salt)
    }
  }
  
  User.beforeCreate(setSaltAndPassword)
  User.beforeUpdate(setSaltAndPassword)