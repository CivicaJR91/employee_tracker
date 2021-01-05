// Dependencies

const mySQL = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");
// const Choices = require("inquirer/lib/objects/choices");

//Database Connection

const connection = mySQL.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",// ADD YOUR MYSQL PASSWORD HERE
    database: "employee_tracker"
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
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Departments",
            "View All Roles",
            "View All Employees",
            "Add Deparments",
            "Add Roles",
            "Add Employee",
            "Update Employees Role"]
    }).then(function (selection) {
        switch (selection.action) {
            case "View All Departments":
                viewDepartments();
                break;

            case "View All Roles":
                viewRoles();
                break;

            case "View All Employees":
                viewEmployees();
                break;

            case "Add Deparments":
                addDepartments();
                break;

            case "Add Roles":
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
        console.log("Department Table");
        console.table(rows);
    });
    runTracker();
}

function viewRoles() {
    const query = "SELECT * FROM role";
    connection.query(query, function (err, rows) {
        if (err) throw err;
        console.log("Roles Table");
        console.table(rows);
    });
    runTracker();
}

function viewEmployees() {
    const query = "SELECT * FROM employee";
    connection.query(query, function (err, rows) {
        if (err) throw err;
        console.log("Employess Table");
        console.table(rows);
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
                    console.log("Department was added to the table");
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

function addEmployee() {
    inquirer.prompt([
        {
            name: "employeeid",
            type: "input",
            message: "Enter Employee ID"
        },
        {
            name: "first",
            type: "input",
            message: "Enter Employee First Name"
        },
        {
            name: "last",
            type: "input",
            message: "Enter Employee Last Name"
        },
        {
            name: "roleid",
            type: "input",
            message: "Enter Role Id"
        },
        {
            name: "managerid",
            type: "input",
            message: "Enter Employee's Manager Id"
        }
     ]).then(function (answer) {
                connection.query("INSERT INTO employee SET ?", {
                    id: answer.employeeid,
                    first_name: answer.first,
                    last_name: answer.last,
                    role_id: answer.roleid,
                    manager_id: answer.managerid
                },
                    function (err) {
                        if (err) throw err;
                        console.log("Employee Was Added!")
                    });
                viewEmployees();

            });
}

function updateEmployeeRole(){
    inquirer.prompt([
        {
            name:"updateemployee",
            type: "rawlist",
            message: "Select the employee that you want to update",
            choices: function(){
                connection.query("SELECT first_name FROM employee", function(err, res){
                    if(err) throw err;
                    console.log(connection.query);
                })
            }
        },
        // {
        //     name:"updateroleid",
        //     type:"list",
        //     message:"Select the role",
        //     choices: function(){
        //         connection.query("SELECT id, title FROM role", function(err, res){
        //             if (err) throw err;
        //         })
        //     }
        // }.then(function (answer){
        //     connection.query("UPDATE role_id SET ? WHERE ?",[
        //         {first_name, last_name: answer.updateemployee}, // set
        //         {role_id:answer.updateroleid} //where

        //     ])
        // })

    ])
}
// function endConnection() {
//     connection.end();
// }


