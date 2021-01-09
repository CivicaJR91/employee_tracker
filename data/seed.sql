

use employee_tracker;
-- Inserting records into the table

insert into deparment(name) values ("Marketing");
insert into deparment(name) values ("Creative");
insert into deparment(name) values ("Sales");
insert into deparment (name) values ("Business Intelligent");

insert into role(title, salary, department_id) values("Sales Manager", 80000,3);
insert into role(title, salary, department_id) values("Creative Manager", 80000,2);
insert into role(title, salary, department_id) values("Associate Creative", 50000,2);
insert into role(title, salary, department_id) values("Marketing Associate", 50000,1);
insert into role(title, salary, department_id) values("Sales Director", 120000,3);
insert into role(title, salary, department_id) values("Creative Director", 120000,2);
insert into role(title, salary, department_id) values("Marketing Director", 120000,1);

insert into employee(first_name,last_name,role_id,manager_id) values ("John", "Smith", 1, 2);
SET FOREIGN_KEY_CHECKS=0;
insert into employee(first_name,last_name,role_id) values ("Paul", "Zimmerman",5);
insert into employee(first_name,last_name,role_id) values ("Jessica", "Simpson",4);



