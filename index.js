const orm = require("./config/orm.js");
const inquirer = require("inquirer");

function mainMenu() {
  console.log("Welcome to the Employee Tracker!\n");
  inquirer
    .prompt({
      type: "list",
      message: "Choose what you would like to do",
      choices: [
        "View employees",
        "View departments",
        "View roles",
        "Add employee",
        "Add department",
        "Add role",
        "Update role",
        "Update manager",
        "Display employees by manager",
        "Delete an employee",
        "Delete a role",
        "Delete a department",
        "View utilized budget for a department",
        "Quit"
      ],
      name: "choice"
    })
    .then(function({ choice }) {
      if (choice === "View employees") {
        orm.viewEmployees().then(function() {
          console.log("\n");
          mainMenu();
        });
      } else if (choice === "View departments") {
        orm.viewDepartments().then(function() {
          console.log("\n");
          mainMenu();
        });
      } else if (choice === "View roles") {
        orm.viewRoles().then(function() {
          console.log("\n");
          mainMenu();
        });
      } else if (choice === "Add employee") {
        addEmployeePrompt();
      } else if (choice === "Add department") {
        addDepartmentPrompt();
      } else if (choice === "Add role") {
        addRolePrompt();
      } else if (choice === "Update role") {
        updateRolePrompt();
      } else if (choice === "Update manager") {
        updateManagerPrompt();
      } else if (choice === "Display employees by manager") {
        displayByMgrPrompt();
      } else if (choice === "Delete an employee") {
        deleteEmployeePrompt();
      } else if (choice === "Delete a role") {
        deleteRolePrompt();
      } else if (choice === "Delete a department") {
        deleteDepartmentPrompt();
      } else if (choice === "View utilized budget for a department") {
        displayUtilizedBudgetPrompt();
      } else {
        orm.endConnection();
      }
    });
}

mainMenu();
