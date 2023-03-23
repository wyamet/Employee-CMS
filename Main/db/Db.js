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

  viewAllDepartments() {
    const sql = "SELECT * FROM department";
    return this.connection
      .promise()
      .query(sql)
      .then(([rows]) => rows);
  }

  viewAllRoles() {
    const sql = "SELECT * FROM role";
    return this.connection
      .promise()
      .query(sql)
      .then(([rows]) => rows);
  }

  viewAllEmployees() {
    const sql = `
      SELECT
        e.id,
        e.first_name,
        e.last_name,
        r.title AS role_title,
        d.name AS department_name,
        r.salary,
        CONCAT(m.first_name, ' ', m.last_name) AS manager_name
      FROM employee e
      JOIN role r ON e.role_id = r.id
      JOIN department d ON r.department_id = d.id
      LEFT JOIN employee m ON e.manager_id = m.id`;
    return this.connection
      .promise()
      .query(sql)
      .then(([rows]) => rows);
  }

  addDepartment(name) {
    const sql = "INSERT INTO department (name) VALUES (?)";
    return this.connection.promise().execute(sql, [name]);
  }

  addRole(title, salary, departmentId) {
    const sql =
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
    return this.connection
      .promise()
      .execute(sql, [title, salary, departmentId]);
  }

  addEmployee(firstName, lastName, roleId, managerId) {
    const sql =
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
    return this.connection
      .promise()
      .execute(sql, [firstName, lastName, roleId, managerId]);
  }

  updateEmployeeRole(employeeId, roleId) {
    const sql = "UPDATE employee SET role_id = ? WHERE id = ?";
    return this.connection.promise().execute(sql, [roleId, employeeId]);
  }

  endConnection() {
    this.connection.end();
    console.log("Connection ended");
  }
}
module.exports = Db;
