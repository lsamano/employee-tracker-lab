document.addEventListener('DOMContentLoaded', () => {
    runTheFetch()
    makeButtonFunctional()
})

makeButtonFunctional = () => {
  const newButton = document.getElementById('new-button')
  const infoBox = document.getElementById("employee-info")
  newButton.addEventListener('click', event => {
    infoBox.innerHTML = `
    <h2>New Employee Form</h2>
    <form id="new-form">
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
        <input type="text" id="ein" name="ein">
        <label for="ein">EIN</label>
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
      // Collect data
      submittedForm = event.target
      const data = {
        firstName: submittedForm.firstName.value,
        lastName: submittedForm.lastName.value,
        ein: submittedForm.ein.value,
        job: {
          title: submittedForm.jobTitle.value,
          description: submittedForm.jobDescription.value
        },
        active: true
      }
      // Send fetch to backend
      fetch('http://localhost:3003/employees', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => {
        // debugger
        // Update sidebar and employee-info div
        forEachObject(data)
        infoBox.innerHTML = `
        <img src="${data.avatar}" alt="avatar of ${data.firstName} ${data.lastName}">
        <h1>${data.firstName} ${data.lastName}</h1>
        <h6>EIN: ${data.ein}</h6>
        <h5>${data.job.title}</h5>
        <p>${data.job.description}</p>
        `
      })
    })
  })
}

runTheFetch = () => {
    return fetch('http://localhost:3003/employees')
        .then(res => res.json())
        .then(data => {
            orderedData = data.sort((a, b) => a.lastName.localeCompare(b.lastName))
            printTheStuff(orderedData)
        })
}

// Run a function to print the stuff
function printTheStuff(info) {
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
    oneLi.addEventListener('click', event => {

        infoBox.innerHTML = `
        <img src="${object.avatar}" alt="avatar of ${object.firstName} ${object.lastName}">
        <h1>${object.firstName} ${object.lastName}</h1>
        <h6>EIN: ${object.ein}</h6>
        <h5>${object.job.title}</h5>
        <p>${object.job.description}</p>
        `
    })

    // Add the li to the navbar
    theNavbar.append(oneLi)
}

// makeFormFunctional = () => {
//     const newForm = document.getElementById('new-form')

//     newForm.addEventListener('submit', event => {
//         event.preventDefault()

//         /////////////////////////
//         const newObject = {
//             word: newForm.word.value,
//             moreInfo: newForm.info.value
//         }
//         forEachObject(newObject)
//         /////////////////////////
//         fetch('http://localhost:3000/datas', {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             },
//             body: JSON.stringify(newObject)
//         })
//         // .then(data => data.json())


//         newForm.reset()
//     })
// }
