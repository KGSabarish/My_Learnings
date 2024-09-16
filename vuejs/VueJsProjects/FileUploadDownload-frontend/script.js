document.getElementById('uploadBtn').addEventListener('click', uploadFile);

function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please select a file to upload.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const fileContent = e.target.result;
        const fileName = file.name;

        // Save the file content and name in local storage (mocking server behavior)
        localStorage.setItem(fileName, fileContent);
        
        displayUploadedFiles();
    };
    reader.readAsDataURL(file);
}

function displayUploadedFiles() {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        const fileName = localStorage.key(i);
        const fileContent = localStorage.getItem(fileName);

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = fileContent;
        a.download = fileName;
        a.textContent = fileName;

        li.appendChild(a);
        fileList.appendChild(li);
    }
}

// Display the files on page load
document.addEventListener('DOMContentLoaded', displayUploadedFiles);
