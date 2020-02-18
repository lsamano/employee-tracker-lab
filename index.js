document.addEventListener('DOMContentLoaded', () => {
    runTheFetch()
    makeButtonFunctional()
})

const makeButtonFunctional = () => {
    const newButton = document.getElementById('new-button')
    const infoBox = document.getElementById("employee-info")
    newButton.addEventListener('click', event => {
        infoBox.innerHTML = `
    <h2>New Employee Form</h2>
    <form id="new-form" autocomplete="off">
      <div class="input-field">
        <input type="text" id="first_name" name="firstName">
        <label for="first_name">First Name</label>
      </div>
      <div class="input-field">
        <input type="text" id="last_name" name="lastName">
        <label for="last_name">Last Name</label>
      </div>
      <div class="input-field">
        <input type="text" id="avatar" name="avatar">
        <label for="avatar">Avatar URL</label>
      </div>
      <div class="input-field">
        <input type="text" id="job_title" name="jobTitle">
        <label for="job_title">Job Title</label>
      </div>
      <div class="input-field">
        <textarea id="job_desc" name="jobDescription" class="materialize-textarea"></textarea>
        <label for="job_desc">Job Description</label>
      </div>
      <div class="input-field">
        <input type="date" id="start_date" name="startDate">
        <label for="start_date">Start Date</label>
      </div>
      <button class="btn waves-effect waves-light red" type="submit">
        Submit
      </button>
    </form>
    `
        newForm = document.getElementById('new-form')

        newForm.addEventListener('submit', event => {
            event.preventDefault()
            // Prepare the data
            submittedForm = event.target
            const formInfo = {
                firstName: submittedForm.firstName.value,
                lastName: submittedForm.lastName.value,
                job: {
                    title: submittedForm.jobTitle.value,
                    description: submittedForm.jobDescription.value
                },
                avatar: submittedForm.avatar.value,
                startDate: submittedForm.startDate.value,
                active: true
            }
            // Send POST request to backend
            fetch('http://localhost:3003/employees', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formInfo)
            })
                .then(res => res.json())
                .then(newEmployee => {
                    // Add new employee to bottom of sidebar list
                    forEachObject(newEmployee)
                    // Update employee-info div
                    showEmployee(newEmployee)
                })
        })
    })
}

const printTheStuff = info => {
    // Clear existing sidebar
    const theNavbar = document.getElementById("employee-list")
    theNavbar.innerHTML = ""
    // Run a function to populate the sidebar
    info.forEach(forEachObject)
}

const forEachObject = object => {
    // Get the navbar
    const theNavbar = document.getElementById("employee-list")
    const infoBox = document.getElementById("employee-info")

    // Make the li with the text
    const oneLi = document.createElement('a')
    oneLi.className = 'collection-item'
    oneLi.innerText = `${object.lastName}, ${object.firstName}`

    // Add click event
    oneLi.addEventListener('click', event => showEmployee(object))

    // Add the li to the navbar
    theNavbar.append(oneLi)
}

const runTheFetch = () => {
    return fetch('http://localhost:3003/employees')
        .then(res => res.json())
        .then(data => {
            orderedData = data.sort((a, b) => a.lastName.localeCompare(b.lastName))
            printTheStuff(orderedData)
        })
}

const showEmployee = employee => {
    const infoBox = document.getElementById("employee-info")
    infoBox.innerHTML = `
        <img src="${employee.avatar}" alt="avatar of ${employee.firstName} ${employee.lastName}">
        <h1>${employee.firstName} ${employee.lastName}</h1>
        <h6>ID#: ${employee.id}</h6>
        <h6>Start Date: ${employee.startDate}</h6>
        <h5>${employee.job.title}</h5>
        <p>${employee.job.description}</p>
        <div id='activity-button'>
        ${employee.active
            ? '<a class="waves-effect waves-light btn red">Active (Press to Inactivate)</a>'
            : '<a class="waves-effect waves-light btn">Inactive (Press to Reactivate)</a>'
        }
        </div>
        `
    addEventToButton(employee)
}

const addEventToButton = employee => {
    const activityButton = document.getElementById('activity-button')
    activityButton.addEventListener('click', event => {
        // Send PATCH request to toggle activity status
        fetch(`http://localhost:3003/employees/${employee.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ active: !employee.active })
        })
            .then(res => res.json())
            .then(data => {
                // Find sidebar instance
                // setTimeOut is only used here to preserve the waves animation effect; it is not needed
                setTimeout(() => {
                    if (data.active) {
                        activityButton.innerHTML = '<a class="waves-effect waves-light btn red">Active (Press to Inactivate)</a>'
                    } else {
                        activityButton.innerHTML = '<a class="waves-effect waves-light btn">Inactive (Press to Reactivate)</a>'
                    }
                }, 500)
                // We are rerunning the Index fetch to repopulate the sidebar
                runTheFetch()
            })
    })
}
