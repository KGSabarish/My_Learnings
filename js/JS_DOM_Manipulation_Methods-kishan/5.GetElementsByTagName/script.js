// Example using getElementsByTagName
var items = document.getElementsByTagName('li');

// Convert HTMLCollection to array using Array.from and then use forEach
Array.from(items).forEach(function(item) {
    item.addEventListener('click', function() {
        this.style.fontWeight = 'bold';
    });
});
