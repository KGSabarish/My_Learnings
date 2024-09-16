function sendRequest() {
  var firstName = document.getElementById('firstNameInput').value;
  var lastName = document.getElementById('lastNameInput').value;
  var location = document.getElementById('locationSelect').value;
  
  var formData = {
    firstName: firstName,
    lastName: lastName,
    location: location
  };

  fetch('/processInputs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => response.text())
  .then(data => {
    console.log('Response from server:', data);
    var responseData = JSON.parse(data);

    console.log(responseData.firstName);
    console.log(responseData.lastName);
    console.log(responseData.location);


    // Get the container element where you want to append the new divs
    var container = document.getElementById('responseContainer');

    // Clear any existing content in the container
    container.innerHTML = '';

    // Create and append new div elements for each value
//    var firstNameDiv = document.createElement('div');
//    firstNameDiv.textContent = 'First Name: ' + responseData.firstName;
//    container.appendChild(firstNameDiv);
//
//    var lastNameDiv = document.createElement('div');
//    lastNameDiv.textContent = 'Last Name: ' + responseData.lastName;
//    container.appendChild(lastNameDiv);
//
//    var locationDiv = document.createElement('div');
//    locationDiv.textContent = 'Location: ' + responseData.location;
//    container.appendChild(locationDiv);
    for (var key in responseData) {
           if (responseData.hasOwnProperty(key)) {
               var value = responseData[key];
               // Create a new div element for each key-value pair
               var div = document.createElement('div');
               div.classList.add('responseItem'); // Add a class for styling
               div.innerHTML = `<label>${key}:</label> <span>${value}</span>`;
               container.appendChild(div); // Append the new div to the container
           }
       }

  })
  .catch(error => console.error('Error:', error));
}
