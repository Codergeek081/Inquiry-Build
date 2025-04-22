import inquirer from "inquirer";
import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config();

import {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
} from "./queries.js";

const sql = postgres(process.env.DB_URL || "");

async function companyCMS(sql: postgres.Sql) {
  const { action }: { action: string } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do today?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
        "Exit"
      ]
    }
  ]);

  switch (action) {
    case "View All Departments":
      await viewAllDepartments(sql);
      break;
    case "View All Roles":
      await viewAllRoles(sql);
      break;
    case "View All Employees":
      await viewAllEmployees(sql);
      break;
    case "Add Department": {
      const { departmentName }: { departmentName: string } = await inquirer.prompt([
        {
          type: "input",
          name: "departmentName",
          message: "Please enter the name of the department:"
        }
      ]);
      await addDepartment(departmentName, sql);
      break;
    }
    case "Add Role": {
      const answers = await inquirer.prompt([
        { type: "input", name: "title", message: "Enter the title of the role:" },
        { type: "input", name: "salary", message: "Enter the salary for the role:" },
        { type: "input", name: "departmentId", message: "Enter the department ID for the role:" }
      ]);
      await addRole(answers.title, parseFloat(answers.salary), parseInt(answers.departmentId), sql);
      break;
    }
    case "Add Employee": {
      const answers = await inquirer.prompt([
        { type: "input", name: "firstName", message: "Enter the first name:" },
        { type: "input", name: "lastName", message: "Enter the last name:" },
        { type: "input", name: "roleId", message: "Enter the role ID:" },
        { type: "input", name: "managerId", message: "Enter the manager ID (leave blank if none):", default: null }
      ]);
      await addEmployee(
        answers.firstName,
        answers.lastName,
        parseInt(answers.roleId),
        answers.managerId ? parseInt(answers.managerId) : null,
        sql
      );
      break;
    }
    case "Update Employee Role": {
      const { employeeId, newRoleId } = await inquirer.prompt([
        { type: "input", name: "employeeId", message: "Enter employee ID:" },
        { type: "input", name: "newRoleId", message: "Enter new role ID:" }
      ]);
      await updateEmployeeRole(parseInt(employeeId), parseInt(newRoleId), sql);
      break;
    }
    case "Exit":
      process.exit();
  }

  await companyCMS(sql);
}

companyCMS(sql);
