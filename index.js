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

function addEmployeePrompt() {
  orm.getEmployees().then(function(res) {
    const managerArray = [];
    for (let i = 0; i < res.length; i++) {
      managerArray.push(res[i].name);
    }
    managerArray.push("none");
    orm.getRoles().then(function(response) {
      const roleTitleArray = [];
      for (let i = 0; i < response.length; i++) {
        roleTitleArray.push(response[i].title);
      }
      inquirer
        .prompt([
          {
            type: "input",
            message: "Enter employee's first name",
            name: "firstName"
          },
          {
            type: "input",
            message: "Enter employee's last name",
            name: "lastName"
          },
          {
            type: "list",
            message: "Select employee's role",
            choices: roleTitleArray,
            name: "role"
          },
          {
            type: "list",
            message: "Select employee's manager",
            choices: managerArray,
            name: "manager"
          }
        ])
        .then(function({ firstName, lastName, role, manager }) {
          const roleId = response[roleTitleArray.indexOf(role)].id;
          if (manager === "none") {
            orm.addEmployee(firstName, lastName, roleId).then(function() {
              console.log("\n");
              mainMenu();
            });
          } else {
            const managerId = res[managerArray.indexOf(manager)].id;
            orm
              .addEmployee(firstName, lastName, roleId, managerId)
              .then(function() {
                console.log("\n");
                mainMenu();
              });
          }
        });
    });
  });
}

mainMenu();
