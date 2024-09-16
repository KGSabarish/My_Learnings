// Example using querySelectorAll
var items = document.querySelectorAll('.item');

// Loop through the NodeList and add event listeners
items.forEach(function(item) {
    item.addEventListener('click', function() {
        this.style.backgroundColor = 'red';
    });
});