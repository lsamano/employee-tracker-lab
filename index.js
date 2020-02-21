document.addEventListener('DOMContentLoaded', () => {
    
    const fetchEmployees = () => {
        return fetch("http://localhost:3003/employees")
        .then(res => res.json())
        .then(employees => {
            // iterate over the employees array
            employees.forEach(employee => renderEmployeeLi(employee))
        })
    }

    const renderEmployeeLi = (employeeObject) => {
        // find ul#employee-list
        const employeeList = document.getElementById("employee-list")
        // Place each employee into list
        const newLi = document.createElement('li')
        newLi.innerText = `${employeeObject.lastName}, ${employeeObject.firstName}`
        
        // on the Li you're about to add to the DOM, add the event listener
        newLi.addEventListener('click', event => showPage(employeeObject))
        employeeList.append(newLi)
    }

    const showPage = (employeeObject) => {
        // console.log("i got it", employeeObject)

        // find employee-info div
        const infoBox = document.getElementById('employee-info')
        // take the employee object's info and put it in a nice format
        const activeStatus = employeeObject.active ? "Active" : "Inactive"

        infoBox.innerHTML = `
            <img src="${employeeObject.avatar}"/>
            <h3>${employeeObject.firstName} ${employeeObject.lastName}</h3>
            <h5>${employeeObject.job.title}</h5>
            <button>${activeStatus}</button>
            `

        const activeButton = infoBox.querySelector('button')
        activeButton.addEventListener('click', event => {
            // sending a fetch to the backend to flip the status
            console.log("hi");

            fetch(`http://localhost:3003/employees/${employeeObject.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    active: !employeeObject.active
                })
            })
                .then(res => res.json())
                .then(updatedEmployee => {
                    showPage(updatedEmployee)
                })

        })

    }

    const makeButtonWork = () => {
        // grab the big red button
        const newButton = document.querySelector('#new-button')
        // add the event listener
        newButton.addEventListener('click', event => {
            // in the event listener callback, 
            // grab the info box
            const infoBox = document.getElementById('employee-info')
            // fill the info box with a form
            infoBox.innerHTML = `
            <form>
            <input name="firstName" placeholder="First Name" />
            <input name="lastName" placeholder="Last Name" />
            <input name="jobTitle" placeholder="Job Title" />
            <input type="submit" />
            </form>
            `

            // find form
            const theForm = infoBox.querySelector("form")
            // give event listener of submit
            theForm.addEventListener('submit', handleSubmit)
        })
    }
    
    const handleSubmit = event => {
        event.preventDefault()
        // console.log("Hi");
        // on submit, need to send POST fetch

        const theForm = document.querySelector("form")
        // get the info from the form
        // debugger
        const newEmployeeInfo = {
            firstName: theForm.firstName.value,
            lastName: theForm.lastName.value,
            job: {
                title: theForm.jobTitle.value
            }
        }
        console.table(newEmployeeInfo);
        
        // send it in the fetch
        fetch("http://localhost:3003/employees", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newEmployeeInfo)
        })
        .then(res => res.json())
        .then(newEmployee => showPage(newEmployee))
    }


    fetchEmployees()
    makeButtonWork()
    // end of the DOMContentLoaded
})