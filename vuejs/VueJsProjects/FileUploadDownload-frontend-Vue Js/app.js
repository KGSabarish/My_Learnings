new Vue({
    el: '#app',
    data: {
        files: []
    },
    methods: {
        handleFileUpload(event) {
            this.file = event.target.files[0];
        },
        uploadFile() {
            if (!this.file) {
                alert('Please select a file to upload.');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
                const fileName = this.file.name;

                // Save the file content and name in local storage (mocking server behavior)
                localStorage.setItem(fileName, fileContent);
                
                this.displayUploadedFiles();
            };
            reader.readAsDataURL(this.file);
        },
        displayUploadedFiles() {
            this.files = [];
            for (let i = 0; i < localStorage.length; i++) {
                const fileName = localStorage.key(i);
                const fileContent = localStorage.getItem(fileName);
                this.files.push({ name: fileName, content: fileContent });
            }
        }
    },
    mounted() {
        this.displayUploadedFiles();
    }
});
