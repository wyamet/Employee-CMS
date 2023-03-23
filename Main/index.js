const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const Db = require("./db/Db");
const { questions } = require("./utils/questions");

const init = async () => {
  const db = new Db("employees");

  try {
    await db.startConnection();
  } catch (error) {
    console.log(error);
  }

  let isRunning = true;

  while (isRunning) {
    const answers = await prompt(questions);
    switch (answers.chooseAction) {
      case "viewAllDepartments":
        try {
          const departments = await db.viewAllDepartments();
          console.table(departments);
        } catch (error) {
          console.log(error);
        }
        break;
      case "viewAllRoles":
        try {
          const roles = await db.viewAllRoles();
          console.table(roles);
        } catch (error) {
          console.log(error);
        }
        break;
      case "viewAllEmployees":
        try {
          const employees = await db.viewAllEmployees();
          console.table(employees);
        } catch (error) {
          console.log(error);
        }
        break;
      case "addDepartment":
        try {
          const department = await prompt([
            {
              type: "input",
              name: "name",
              message: "Enter department name:",
            },
          ]);
          await db.addDepartment(department.name);
          console.log(`Added ${department.name} department to the database`);
        } catch (error) {
          console.log(error);
        }
        break;

      case "addRole":
        try {
          const departments = await db.viewAllDepartments();
          const role = await prompt([
            {
              type: "input",
              name: "title",
              message: "Enter role title:",
            },
            {
              type: "input",
              name: "salary",
              message: "Enter role salary:",
            },
            {
              type: "list",
              name: "department_id",
              message: "Choose department:",
              choices: departments.map(({ id, name }) => ({
                name,
                value: id,
              })),
            },
          ]);
          await db.addRole(role.title, role.salary, role.department_id);
          console.log(`Added ${role.title} role to the database`);
        } catch (error) {
          console.log(error);
        }
        break;

      case "addEmployee":
        try {
          const employeeData = await prompt([
            {
              type: "input",
              name: "firstName",
              message: "What is the employee's first name?",
            },
            {
              type: "input",
              name: "lastName",
              message: "What is the employee's last name?",
            },
            {
              type: "list",
              name: "roleId",
              message: "What is the employee's role?",
              choices: (
                await db.viewAllRoles()
              ).map((role) => ({ name: role.title, value: role.id })),
            },
            {
              type: "list",
              name: "managerId",
              message: "Who is the employee's manager?",
              choices: (
                await db.viewAllEmployees()
              ).map((employee) => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
              })),
            },
          ]);
          await db.addEmployee(
            employeeData.firstName,
            employeeData.lastName,
            employeeData.roleId,
            employeeData.managerId
          );
          console.log(
            `Employee added: ${employeeData.firstName} ${employeeData.lastName}`
          );
        } catch (error) {
          console.log(error);
        }
        break;
      case "updateEmployeeRole":
        try {
          const employeeData = await prompt([
            {
              type: "list",
              name: "id",
              message: "Which employee's role do you want to update?",
              choices: await db.viewAllEmployees(),
            },
            {
              type: "list",
              name: "roleId",
              message: "What is the employee's new role?",
              choices: await db.viewAllRoles(),
            },
          ]);
          await db.updateEmployeeRole(employeeData.id, employeeData.roleId);
          console.log(`Employee role updated`);
        } catch (error) {
          console.log(error);
        }
        break;
      case "end":
        console.log("App has stopped");
        isRunning = false;
        db.endConnection();
        break;
      default:
        console.log("Invalid option");
    }
  }
};

init();
