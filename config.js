const dotenv = require('dotenv');
dotenv.config();

/**
 * This is for manage enviroment variables
 */
module.exports = {
  nameDb: process.env.NAME_DB,
  passwdDb: process.env.PASSWORD_DB,
  dbName: process.env.DB_NAME,
};
