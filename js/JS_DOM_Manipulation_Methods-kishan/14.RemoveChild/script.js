function removeListItem() {
    // Select the <ul> element
    var list = document.getElementById('list');

    // Select the <li> item to remove (in this case, the first <li>)
    var itemToRemove = list.querySelector('li');

    // Remove the selected <li> item from the <ul> list
    list.removeChild(itemToRemove);
}