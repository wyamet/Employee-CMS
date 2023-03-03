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
        // Handle viewAllRoles option
        break;
      case "viewAllEmployees":
        // Handle viewAllEmployees option
        break;
      case "addDepartment":
        // Handle addDepartment option
        break;
      case "addRole":
        // Handle addRole option
        break;
      case "addEmployee":
        // Handle addEmployee option
        break;
      case "updateEmployeeRole":
        // Handle updateEmployeeRole option
        break;
      case "end":
        console.log("App has stopped");
        isRunning = false;
        await db.endConnection();
        break;
      default:
        console.log("Invalid option");
    }
  }
};

init();
