function setAttributes() {
    // Select the div element
    var element = document.getElementById('example');

    // Set or update the 'class' attribute
    element.setAttribute('class', 'box highlight');

    // Set or update the 'data-info' attribute
    element.setAttribute('data-info', 'updated-data');

    // Log the updated attributes to the console for verification
    console.log('Updated class attribute:', element.getAttribute('class'));
    console.log('Updated data-info attribute:', element.getAttribute('data-info'));
}