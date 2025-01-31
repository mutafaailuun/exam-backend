const mysql = require("mysql2/promise");
require("dotenv").config();

let connection;

const connectToDatabase = async () => {
  if (!connection || connection.connection._closing) {
    try {
      connection = await mysql.createConnection({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
      });
      console.log("Connected to the database");
    } catch (error) {
      console.error("Error connecting to the database:", error);
      throw error;
    }
  }
  return connection;
};

module.exports = {
  query: async (sql, params) => {
    const conn = await connectToDatabase();
    return conn.execute(sql, params);
  },
};
