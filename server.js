// Dependencies

const mySQL = require("mysql");
const inquirer = require("inquirer");
// const Choices = require("inquirer/lib/objects/choices");

//Database Connection

const connection = mySQL.createConnection({
    host: "localhost",
    port:3306,
    user: "root",
    password:"MYSQL01233",
    database:"employee_tracker"
});

// Establishing Connection
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected.ID:" + connection.threadId)
    runTracker();
});

function runTracker() {
    inquirer.prompt({
        name: "action",
        type:"list",
        message: "What would you like to do?",
        choices: ["View all departments",
    "View all roles",
    "View all employees",
    "Add deparments",
    "Add roles",
    "Add Employee",
    "Update Employees Role"]
    }).then (function(selection){
        switch (selection.action){
            case "View all departments":
                viewDepartments(); //write function to see all deparments
                break;

            case "View all roles":
                viewRoles(); // write function to see all Roles
                break;

            case "View all employees":
                viewEmployees(); // write function to see all employees
                break;

            case "Add deparments":
                addDepartments();//write function to add departments
                break;

            case "Add roles":
                addRoles(); // write function to add roles
                break;

            case "Add Employee":
                addEmployee(); // write function to add employee
                break;

            case "Update Employees Role":
                updateEmployeeRole();// write function to update employee roles
                break;

        }
    });
}

function viewDepartments(){
    const query = "SELECT * FROM deparment";
    connection.query(query, function(err, rows){
        if(err) throw err;
        console.log(rows);
    });
}

function viewRoles(){
    const query = "SELECT * FROM role";
    connection.query(query, function(err, rows){
        if(err) throw err;
        console.log(rows);
    })
}