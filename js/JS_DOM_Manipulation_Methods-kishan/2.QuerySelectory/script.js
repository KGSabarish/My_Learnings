 // Example using querySelector
 var highlightedItem = document.querySelector('.highlight');
 console.log(highlightedItem.textContent);

 // Adding event listener to the highlighted item
 highlightedItem.addEventListener('copy', function() {
     this.textContent = 'red';
 });