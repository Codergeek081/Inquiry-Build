import inquirer from "inquirer";
import postgres from 'postgres'
import {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
} from "./queries.js";



// https://github.com/porsager/postgres //



const sql = postgres('postgresql://INQ_owner:npg_6PvJzKUmcau9@ep-yellow-sky-a5is97b1-pooler.us-east-2.aws.neon.tech/INQ?sslmode=require')

async function companyCMS(sql) {
  const { action } = await inquirer.prompt([
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
      const { departmentName } = await inquirer.prompt([
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
      const { title, salary, departmentId } = await inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "Enter the title of the role:"
        },
        {
          type: "input",
          name: "salary",
          message: "Enter the salary for the role:"
        },
        {
          type: "input",
          name: "departmentId",
          message: "Enter the department ID for the role:"
        }
      ]);
      await addRole(title, parseFloat(salary), parseInt(departmentId), sql);
      break;
    }

    case "Add Employee": {
      const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        {
          type: "input",
          name: "firstName",
          message: "Enter the first name of the employee:"
        },
        {
          type: "input",
          name: "lastName",
          message: "Enter the last name of the employee:"
        },
        {
          type: "input",
          name: "roleId",
          message: "Enter the role ID for the employee:"
        },
        {
          type: "input",
          name: "managerId",
          message: "Enter the manager ID for the employee (leave blank if none):",
          default: null
        }
      ]);
      await addEmployee(
        firstName,
        lastName,
        parseInt(roleId),
        managerId ? parseInt(managerId) : null
      );
      break;
    }

    case "Update Employee Role": {
      const { employeeId, newRoleId } = await inquirer.prompt([
        {
          type: "input",
          name: "employeeId",
          message: "Enter the ID of the employee to update:"
        },
        {
          type: "input",
          name: "newRoleId",
          message: "Enter the new Role ID for the employee:"
        }
      ]);
      await updateEmployeeRole(parseInt(employeeId), parseInt(newRoleId));
      break;
    }

    case "Exit":
      process.exit();
  }

  // Call again to allow the user to perform more actions
  await companyCMS(sql);
}

companyCMS(sql)

