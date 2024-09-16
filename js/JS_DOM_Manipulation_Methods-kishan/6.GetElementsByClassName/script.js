// Example using getElementsByClassName
var items = document.getElementsByClassName('item');

// Loop through the HTMLCollection and add event listeners
for (var i = 0; i < items.length; i++) {
    items[i].addEventListener('click', function() {
        // Toggle the 'highlight' class on click
        this.classList.remove('highlight');
    });
}