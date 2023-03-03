const questions = [
  {
    type: "list",
    message: "Please select your action",
    choices: [
      {
        value: "viewAllDepartments",
        name: "View All Departments",
      },
      {
        value: "viewAllRoles",
        name: "View All Roles",
      },
      {
        value: "viewAllEmployees",
        name: "View All Employees",
      },
      {
        value: "addDepartment",
        name: "Add a Department",
      },
      {
        value: "addRole",
        name: "Add a Role",
      },
      {
        value: "addEmployee",
        name: "Add an Employee",
      },
      {
        value: "updateEmployeeRole",
        name: "Update an Employee Role",
      },
      {
        value: "end",
        name: "End Program",
      },
    ],
    name: "chooseAction",
  },
];

const anotherOne = [];

module.exports = { questions, anotherOne };
