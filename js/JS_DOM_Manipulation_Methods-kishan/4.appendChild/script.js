// Create a new div element
var newDiv = document.createElement('div');
newDiv.className = 'box';
newDiv.textContent = 'Box 2';

// Get the parent element to which we want to append the new div
var container = document.getElementById('container');

// Append the new div as the last child of the container
container.appendChild(newDiv);