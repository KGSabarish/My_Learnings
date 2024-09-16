<template>
    <div class="container">
      <h1>File Upload and Download</h1>
      <input type="file" @change="onFileChange" />
      <button @click="uploadFile">Upload</button>
      <ul>
        <li v-for="file in files" :key="file">
          <a :href="`http://localhost:3000/uploads/${file}`" download>{{ file }}</a>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import fileService from '@/services/fileService';
  
  export default {
    data() {
      return {
        selectedFile: null,
        files: [],
      };
    },
    mounted() {
      this.fetchFiles();
    },
    methods: {
      onFileChange(event) {
        this.selectedFile = event.target.files[0];
      },
      async uploadFile() {
        if (!this.selectedFile) return;
        const formData = new FormData();
        formData.append('file', this.selectedFile);
  
        try {
          await fileService.uploadFile(formData);
          this.fetchFiles();
        } catch (error) {
          console.error('File upload failed', error);
        }
      },
      async fetchFiles() {
        try {
          this.files = await fileService.getFiles();
        } catch (error) {
          console.error('Failed to fetch files', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    text-align: center;
  }
  </style>
  