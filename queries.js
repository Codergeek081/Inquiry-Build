export async function viewAllDepartments(sql) {
  try {
    console.log(process.env.DB_URL)
    const result = await sql`SELECT * FROM department`;
    console.log('viewAllDepartments', result)
  } catch (error) {
    console.error('Error:', error.message);
    // Log detailed error
    console.error(error);
  }
}

export async function viewAllRoles(sql) {
    try{
        console.log(process.env.DB_URL)
        const result = await sql`SELECT * FROM role`; 
        console.log('viewAllRoles', result)
    } catch (error) {
        console.error('Error:', error.message);
        // Log detailed error
        console.error(error);
    }
 
}

export async function viewAllEmployees(sql) {
    try{
        console.log(process.env.DB_URL)
        const result = await sql `SELECT * FROM employee`;
        console.log('viewAllEmployees', result)
    } catch (error) {
        console.error('Error:', error.message);
        // Log detailed error
        console.error(error);
    } 

}

export async function addDepartment(departmentName, sql) {
    try {
        await sql `INSERT INTO department (name) VALUES (${departmentName})`;
        console.log(`Department "${departmentName}" added successfully.`);
    } catch (error) {
        console.error('Error added department:'. error.message);
    }
}


export function addRole() {
  console.log('addRole')
}

export function addEmployee() {
  console.log('addEmployee')
}

export function updateEmployeeRole() {
  console.log('updateEmployeeRole')
}