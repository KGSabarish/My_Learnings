function removeClassAttribute() {
    // Select the div element
    var element = document.getElementById('example');

    // Remove the 'class' attribute
    element.removeAttribute('class');

    // Log the updated attributes to the console for verification
    console.log('Updated class attribute:', element.getAttribute('class'));
}