import postgres from "postgres";

export async function viewAllDepartments(sql: postgres.Sql) {
  try {
    const result = await sql`SELECT * FROM department`;
    console.log('Departments:', result);
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

export async function viewAllRoles(sql: postgres.Sql) {
  try {
    const result = await sql`SELECT * FROM role`;
    console.log('Roles:', result);
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

export async function viewAllEmployees(sql: postgres.Sql) {
  try {
    const result = await sql`SELECT * FROM employee`;
    console.log('Employees:', result);
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

export async function addDepartment(departmentName: string, sql: postgres.Sql) {
  try {
    await sql`INSERT INTO department (name) VALUES (${departmentName})`;
    console.log(`Department "${departmentName}" added.`);
  } catch (error: any) {
    console.error('Error adding department:', error.message);
  }
}

export async function addRole(title: string, salary: number, departmentId: number, sql: postgres.Sql) {
  try {
    await sql`INSERT INTO role (title, salary, department_id) VALUES (${title}, ${salary}, ${departmentId})`;
    console.log(`Role "${title}" added.`);
  } catch (error: any) {
    console.error('Error adding role:', error.message);
  }
}

export async function addEmployee(firstName: string, lastName: string, roleId: number, managerId: number | null, sql: postgres.Sql) {
  try {
    await sql`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (${firstName}, ${lastName}, ${roleId}, ${managerId})`;
    console.log(`Employee "${firstName} ${lastName}" added.`);
  } catch (error: any) {
    console.error('Error adding employee:', error.message);
  }
}

export async function updateEmployeeRole(employeeId: number, newRoleId: number, sql: postgres.Sql) {
  try {
    await sql`UPDATE employee SET role_id = ${newRoleId} WHERE id = ${employeeId}`;
    console.log(`Employee ID ${employeeId} role updated.`);
  } catch (error: any) {
    console.error('Error updating employee role:', error.message);
  }
}
