# Employee Tracker Lab
You've been hired as a frontend developer for a startup company. They would like you to build the frontend of a single-page app (SPA) to help them keep track of their employees.

# Setup
Run `json-server db.json --watch --port 3003` to run your backend server on port 3003 (feel free to change your chosen port).

# Deliverables
### A. Viewing All Employees
1. On page load, show the list of employees by *full name* in the `sidebar` div. It should look like `LastName, FirstName`.
2. When an employee name is clicked, all of their info should be shown in the `info-box` div (Show Page). This includes:
    - Their avatar
    - Their full name
    - Their job title
    - Their job description
    - Their EIN (Employee Identification Number)
    - The date they started with the company
Be sure to look over the data structure in the json file.
### B. Adding New Employees
Nice work! Your manager is impressed. You're now tasked with adding the ability to add newly-hired employees to the Employee Tracker.
3. When I click the `+` button, the contents of `employee-info` changes to a form.
4. Submission of this form adds the new employee to the database.
5. After the employee is successfully added to the database, their name is added to the sidebar.
6. The form is immediately replaced with the new employee's info (Show Page).

Keep the names in the sidebar in order of last name.
Have selected name light up as active.