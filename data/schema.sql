DROP DATABASE IF EXISTS employee_tracker;
create database employee_tracker;

use employee_tracker;

create table deparment(
id int not null auto_increment,
name varchar(30),
primary key(id)
);

create table role(
id int not null auto_increment,
title varchar(30),
salary decimal,
department_id int,
primary key(id),
FOREIGN KEY (department_id) REFERENCES deparment(id)

);
 USE employee_tracker;
create table employee(
id int not null auto_increment,
first_name varchar(30),
last_name varchar(30),
role_id int,							
manager_id int,
primary key(id),
FOREIGN KEY (role_id) REFERENCES role(id),
FOREIGN KEY (manager_id) REFERENCES employee(id)

);


