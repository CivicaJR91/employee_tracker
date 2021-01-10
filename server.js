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
            name: "department",
            type: "input",
            message: "Enter New Department"
        }]).then(function (answer) {
            connection.query("INSERT INTO deparment SET ?",
                {
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
    connection.query("SELECT name FROM deparment;", function (err, res) {
        if (err) throw err;

        inquirer.prompt([
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
                name: "deparmentid",
                type: "list",
                choices: function () {
                    const departName = []
                    for (var i = 0; i < res.length; i++) {
                        departName.push(res[i].name);
                    }
                    return departName;
                },
                message: "Select the department"
            }

        ]).then(function (answer) {
            const department = "SELECT id FROM deparment WHERE name = ?";
            let id;
            connection.query(department, [answer.deparmentid], function (err, result) {
                for (i = 0; i < result.length; i++) {
                    id = result[i].id;
                    console.log(result[i]);
                    console.log(result[i].id);

                }
                connection.query("INSERT INTO role set ?", {
                    title: answer.roletitle,
                    salary: answer.salary,
                    department_id: id,
                }, function (err) {
                    if (err) throw err;
                    console.log("Role Was Updated");
                    viewRoles();
                });
            })

        });
    })

}

function addEmployee() {
    connection.query("SELECT title FROM role;", function (err, res) {
        if (err) throw err;

        inquirer.prompt([
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
                type: "list",
                choices: function () {
                    const roleTitle = [];
                    for (var i = 0; i < res.length; i++) {
                        roleTitle.push(res[i].title);
                    }
                    return roleTitle;
                },
                message: "Select Role"
            },
            {
                name: "managerid",
                type: "input",
                message: "Enter Employee's Manager Id"
            }
        ]).then(function (answer) {
            const roleid = "SELECT id FROM role WHERE title = ?";
            let id;
            connection.query(roleid, [answer.roleid], function (err, result) {
                for (var i = 0; i < result.length; i++) {
                    id = result[i].id;
                    console.log(result[i]);
                    console.log(result[i].id);
                }

                connection.query("SET FOREIGN_KEY_CHECKS=0;");
                connection.query("INSERT INTO employee SET ?", {
                    first_name: answer.first,
                    last_name: answer.last,
                    role_id: id,
                    manager_id: answer.managerid
                },
                    function (err) {
                        if (err) throw err;
                        console.log("Employee Was Added!")
                        viewEmployees();
                    });
            })

        });
    });
}

function updateEmployeeRole() {
    const emplList = "SELECT concat(first_name, ',', last_name) AS EmployeeName FROM employee";
    
    connection.query(emplList, function(err,res){
        if(err) throw err;
            inquirer.prompt([
                {
                    name: "updateemployee",
                    type: "list",
                    choices: function () {
                        const emplName = [];
                        for (var i = 0; i < res.length; i++) {
                            emplName.push(res[i].EmployeeName);//concatenei first_name and last_name
                        }
                        return emplName;
                    },
                    message: "Select the employee that you want to update"
                }
            ]).then(function(answer){
                const roleList = "SELECT title FROM role";
                connection.query(roleList, function(err,res){
                    if(err) throw err;
                    inquirer.prompt([
                        {
                            name: "updaterole",
                            type: "list",
                            choices: function () {
                                const roles = [];
                                for (var i = 0; i < res.length; i++) {
                                    roles.push(res[i].title);
                                }
                                return roles;
                            },
                            message:"Select Role"
                        }
                    ])
                })
                connection.query("")

            })
        
    })
    



}
// {
//     name: "updateroleid",
//         type: "list",
//             message: "Select the role",
//                 choices: function() {
//         //         connection.query("SELECT id, title FROM role", function(err, res){
        //             if (err) throw err;
        //         })
        //     }
        // }.then(function (answer){
        //     connection.query("UPDATE role_id SET ? WHERE ?",[
        //         {first_name, last_name: answer.updateemployee}, // set
        //         {role_id:answer.updateroleid} //where

        //     ])
        // })

    // ])
// }
// function endConnection() {
//     connection.end();
// }

