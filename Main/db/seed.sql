use employees;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Anne', 'Bonny', 1, NULL),
    ('Benjamin', 'Hornigold', 2, 1),
    ('Edward', 'Teach', 3, NULL),
    ('Charles', 'Vane', 4, 3),
    ('Andre', 'Hicks', 5, NULL),
    ('Mary', 'Read', 6, 5),
    ('Thomas', 'Tew', 7, NULL),
    ('Sayyida', 'Hurra', 8, 7);
