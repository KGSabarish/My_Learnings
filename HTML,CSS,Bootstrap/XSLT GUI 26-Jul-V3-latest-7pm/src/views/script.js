export default {
  name: 'UploadTemplate',
  data() {
    return {
      files: [],
      uploaded: false,
      status: '',
    };
  },
  computed: {
    uploadDisabled() {
      return this.files.length === 0;
    },
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFiles(event) {
      const selectedFiles = Array.from(event.target.files);
      this.files = this.files.concat(selectedFiles);
    },
    addFile(event) {
      const draggedFiles = Array.from(event.dataTransfer.files);
      this.files = this.files.concat(draggedFiles);
    },
    removeFile(file) {
      this.files = this.files.filter(f => f !== file);
    },
    formatSize(size) {
      return (size / 1024).toFixed(2);
    },
    upload() {
      // Your upload logic here
      this.uploaded = true;
      this.status = 'Upload successful!';
    },
  },
};