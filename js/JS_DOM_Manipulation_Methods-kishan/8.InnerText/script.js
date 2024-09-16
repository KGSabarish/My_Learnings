function changeText() {
    // Select the paragraph element
    var paragraph = document.getElementById('content');

    // Change the text content using innerText
    paragraph.innerText = 'This text has changed dynamically!<span> hii </span>';
}