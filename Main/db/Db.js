const connection = require("./connection");
const mysql = require("mysql2");

class Db {
  constructor(database) {
    this.database = database;
    this.connection = mysql.createConnection({
      host: "localhost",
      // Your username
      user: "root",
      // Your password
      password: "NEWPASSWORD",
      database,
    });
  }

  startConnection() {
    return new Promise((resolve, reject) => {
      const whenConnect = (error) => {
        if (error) reject(error);
        console.log(`Connected to ${this.database}`); // template string/ template literal -- es6
        console.log("Connected to " + this.database); // concatenation -- es5
        resolve();
      };
      this.connection.connect(whenConnect);
    });
  }

  endConnection() {
    this.connection.end();
    console.log("Connection ended");
  }
}
module.exports = Db;
