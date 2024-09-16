function changeContent() {
    // Select the paragraph element
    var paragraph = document.getElementById('content');

    // Change the HTML content using innerHTML
    paragraph.innerHTML = 'This content has <span class="highlight">changed dynamically</span>!';
}