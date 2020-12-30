// Dependencies

const mySQL = require("mysql");
const inquirer = require("inquirer");
// const Choices = require("inquirer/lib/objects/choices");

//Database Connection

const connection = mySQL.createConnection({
    host: "localhost",
    port:3306,
    user: "root",
    password:"",// add MYSQL PASSWORD
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
                viewDepartments(); 
                break;

            case "View all roles":
                viewRoles(); 
                break;

            case "View all employees":
                viewEmployees(); 
                break;

            case "Add deparments":
                addDepartments();
                break;

            case "Add roles":
                addRoles(); 
                break;

            case "Add Employee":
                addEmployee(); 
                break;

            case "Update Employees Role":
                updateEmployeeRole();
                break;

        }
    });
}

function viewDepartments() {
    const query = "SELECT * FROM deparment";
    connection.query(query, function (err, rows) {
        if (err) throw err;
        console.log(rows);
    });
runTracker();
}

function viewRoles() {
    const query = "SELECT * FROM role";
    connection.query(query, function (err, rows) {
        if (err) throw err;
        console.log(rows);  
    });
    runTracker();
}

function viewEmployees() {
    const query = "SELECT * FROM employee";
    connection.query(query, function (err, rows) {
        if (err) throw err;
        console.log(rows);
    });

    runTracker();
}

function addDepartments() {
    inquirer.prompt([
{
    name: "departmentid",
    type: "input",
    message: "Add Department iD"
},
{
    name: "department",
    type: "list",
    message: "Select the Department You want to Add:",
    choices: ["Accounting", "Information Technology", "Bussines Intelligent", "Legal"]
}]).then(function (answer) {
        connection.query("INSERT INTO deparment SET ?",
            {
                id: answer.departmentid,
                name: answer.department
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + "was added to the table");
            });
            viewDepartments();
    });
}

function addRoles() {
    inquirer.prompt([

        {
            name: "roleid",
            type: "input",
            message: "Add Role Id"
        },
        {
            name: "roletitle",
            type: "input",
            message: "Add Role Title"

        },
        {
            name: "salary",
            type: "input",
            message: "Enter Role Salary"
        },
        {
            name: "departmentid",
            type: "input",
            message: "Enter Department Id"
        }
    ]).then(function (answer) {
        connection.query("INSERT INTO role SET ?", {
            id: answer.roleid,
            title: answer.roletitle,
            salary: answer.salary,
            department_id: answer.departmentid
        },
            function (err) {
                if (err) throw err;
                console.log("Department was added");

            });
            viewRoles();
    });
}

function addEmployee(){
    inquirer.prompt([
        {
        name: "employeeid",
        type:"input",
        message:"Enter Employee ID"
        },
        {
        name: "first",
        type:"input",
        message:"Enter Employee First Name"
        },
        {
        name:"last",
        type:"input",
        message:"Enter Employee Last Name"
        },
        {
            name:"roleid",
            type:"input",
            message:"Enter Role Id"
        },
        {
            name:"managerid",
            type:"input",
            message:"Enter Employee's Manager Id"
        }.then (function(answer){
            connection.query("INSERT INTO employee SET?",{
                id: answer.employeeid,
                first_name:answer.first,
                last_name:answer.last,
                role_id:answer.roleid,
                manager_id:answer.manager_id
            }, function(err){
                if (err) throw err;
                console.log("Employee Was Added!")
            })
            viewEmployees();
        })
    ])
}

// function endConnection() {
//     connection.end();
// }


