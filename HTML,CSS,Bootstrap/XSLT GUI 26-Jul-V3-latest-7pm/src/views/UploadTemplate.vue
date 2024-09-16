<template>
  <!-- FileCheck Modal Start -->
  <div
    class="modal fade"
    id="fileCheckModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
            {{ popup.title }}
          </h1>
          <!-- <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="executePrimaryAction()"
          ></button> -->
        </div>
        <div class="modal-body">{{ popup.body }}</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="handleSecondaryAction()"
          >
            {{ popup.secondaryActionLabel }}
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="handlePrimaryAction()"
            data-bs-dismiss="modal"
          >
            {{ popup.actionLabel }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- FileCheck Modal End  -->
  <div
    v-cloak
    @drop.prevent="addFile"
    @dragover.prevent
    class="file-upload"
    id="file-upload-id"
    role="dialog"
  >
    <!-- <div class="file-upload-sub" id="file-upload-sub"> -->
    <h4>Drag and drop files here or <br />Select Files</h4>

    <!-- File Input Button -->
    <input
      type="file"
      multiple
      @change="handleFiles"
      ref="fileInput"
      class="file-input"
      :accept="uploadConfigs.accept"
    />

    <button @click="triggerFileInput">Select Files</button>

    <p v-if="files.length > 0">{{ files.length }} file(s) selected</p>
    <ul :class="{ 'scroll-class': files.length > 0 }">
      <li v-for="file in files" :key="file.name">
        {{ file.name }} ({{ formatSize(file.size) }} kb)
        <button @click="removeFile(file)" title="Remove" class="btn">X</button>
      </li>
    </ul>
    <div class="widget_text widget-wrap">
      <div class="textwidget custom-html-widget">
        <button :disabled="uploadDisabled" @click="process" class="btn">
          {{ uploadConfigs.actionLabel }}
        </button>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>
<script>
import axios from "axios";
import { Modal } from "bootstrap";
import { toast } from "vue3-toastify";
import { action,type } from "./util";
import Store from "@/vuex/store";
import  {getCookie} from "../cookie.js";

export default {
  name: "UploadTemplate",
  computed: {
    requestId() {
      return Store.getters.getRequestId;
    },
    uploadDisabled() {
      return this.files.length === 0;
    },
  },
  data() {
    return {
      files: [],
      userId: getCookie("userId"),

      // Data properties for modal content
      popup: {
        // title: "delete",
        // body: "are you are ",
        // actionLabel: "delete",
        // secondaryActionLabel: "Cancel",
        // data: "actions",
      },
      num: 1,

      availableFiles: [],
      currentFileName: 0,
      selectedFiles: [],
      succeededFiles : [],
      failedFiles : []
    };
  },
  props: {
    uploadConfigs: {
      type: Object,
      required: true,
    },
  },

  mounted() {},

  methods: {
    showSuccess(message) {
      toast.success(message, {
        autoClose: 3000,
      });
    },
    showError(message) {
      toast.error(message, {
        autoClose: 5000,
      });
    },
    executePrimaryAction() {},

    openModal() {
      const modal = document.getElementById("fileCheckModal");
      document.body.appendChild(modal);

      var myModal = new Modal(modal, {
        keyboard: false,
      });
      myModal.show();
    },
    closeModal() {
      const modal = document.getElementById("fileCheckModal");
      document.body.appendChild(modal);

      var myModal = new Modal(modal, {
        keyboard: false,
      });
      myModal.hide();
    },

    addFile(event) {
      let droppedFiles = Array.from(event.dataTransfer.files);
      if (!droppedFiles) return;
      this.files = this.files.concat(droppedFiles);
    },

    removeFile(file) {
      this.files = this.files.filter((f) => f !== file);
    },

    formatSize(size) {
      return (size / 1024).toFixed(2);
    },
    handlePrimaryAction() {
      // if (data.action === action.REPLACE) {
      console.log("FileName to be updated", this.currentFileName);

      this.files = this.files.concat(
        this.selectedFiles.find((file) => file.name == this.currentFileName)
      );
      console.log("selected file is handleprimary", this.selectedFiles);
      console.log("file is handleprimary", this.files);
      // }
      this.setConfirmModalData();
    },
    handleSecondaryAction() {
      this.removeFile(
        this.selectedFiles.find(
          (file) => file.fileName === this.currentFileName
        )
      );
      console.log("FileName to be Removed:", this.currentFileName);
      this.setConfirmModalData();
    },
    setConfirmModalData() {
      if (this.availableFiles.length > 0) {
        this.currentFileName = this.availableFiles[0].fileName;
        console.log("availfiles", this.availableFiles);
        console.log("current file name", this.currentFileName);

        var fileNameMsg =
          this.currentFileName +
          " " +
          "already exist!. \n Would you like to replace?";

        let data = {
          action: action.REPLACE,
        };

        this.setConfirmModalValues(
          "File Check",
          fileNameMsg,
          "Replace",
          "Cancel",
          data
        );
        this.openModal();
        this.availableFiles = this.availableFiles.filter(
          (file) => file.fileName !== this.currentFileName
        );
      }
    },
    appendUnAvailFiles(files) {
      // for(let i=0;i<files.length;i++){
      const unAvailFiles = this.selectedFiles.filter((selectedFile) =>
        files.some((file) => file === selectedFile.name)
      );

      // Concatenate the filtered files to files
      this.files = this.files.concat(unAvailFiles);
      // }
    },
    async handleFiles(event) {
      this.selectedFiles = Array.from(event.target.files);
      console.log("selected Files in handle", this.selectedFiles);

      if (this.selectedFiles.length >= 0) {
        console.log("Selected Files:", this.selectedFiles);
        let fileNames = this.selectedFiles.map((file) => file.name);

        const fileCheckbody = {
          userId: this.userId,
          files: fileNames,
          type: this.uploadConfigs.type,
        };
        console.log("File check body", fileCheckbody);
        let response = null;
        try {
          response = await axios.post(process.env.VUE_APP_BASE_URL+"/dev/checkfile", fileCheckbody);
          console.log("Response :", response);

          if (response.status == 200) {
            this.availableFiles = response.data.availableFiles;
            console.log("Avail Files Lenght", this.availableFiles.length);
            this.appendUnAvailFiles(response.data.unavailableFiles);
            this.setConfirmModalData();
          }
        } catch (error) {
          console.log("Error:", error);
          response = error.response;
          if (error.response.status == 404) {
            console.log(response);
            this.files = this.files.concat(this.selectedFiles[0]);
          }
        } finally {
          console.log(response);
        }
      }
    },

    setConfirmModalValues(
      title,
      body,
      actionLabel,
      secondaryActionLabel,
      data
    ) {
      const confirmModalData = {
        title,
        body,
        actionLabel,
        secondaryActionLabel,
        data,
      };
      this.popup = { ...confirmModalData };
      
    },
    

    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async process() {
      
      let endpoint =
        this.uploadConfigs.type == type.XML
          ? "https://y6n0hclun4.execute-api.us-east-2.amazonaws.com/dev/transform"
          : process.env.VUE_APP_BASE_URL+"/dev/convert";

      const uploadFile = async (file) => {
        try {
          let formData = new FormData();
          formData.append("file", file);
          formData.append("userId", this.userId);
          if (this.uploadConfigs.type === "xml") {
            formData.append("xslId", this.requestId);
          }

          // Await the axios post request
          const response = await axios.post(endpoint, formData);
          console.log("Response :", response);
          // Check the response status
          if (response.status === 202) {
            var successMessage = {
              fileName : file.name,
              message: response.data.message
            }
            this.succeededFiles.push(successMessage)
            this.removeFile(file);
            return successMessage // Resolve with the message
          } 
        } catch (error) {
          

          var failureMessage = {
              fileName : file.name,
              message: error
            }
            this.failedFiles.push(failureMessage)
          return failureMessage; // Handle errors properly
        }
      };

      const uploadPromises = Array.from(this.files).map((file) =>
        uploadFile(file)
      );

      console.log("upload Promis ", uploadPromises);
      Promise.all(uploadPromises)
        .then(() => {
          // console.log("All files uploaded:", results);
          console.log("Succeed Files ",this.succeededFiles.length)
          console.log("Failed Files ",this.failedFiles.length)
          if(this.succeededFiles.length !=0){
            this.showSuccess(this.succeededFiles.length+" File(s) Accepted")
          }
          
          if(this.failedFiles.length!=0){
            this.showError(this.failedFiles.length+" File(s) Failed");
          }
        })
        .catch((error) => {
          console.log("Error uploading files:", error);
        });
     
    },
  
    report() {
      this.$emit("report");
    },
  },
};
</script>

<style>
.file-upload {
  width: 100%;
  height: 58vh;
  border: 2px dashed #333;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  float: left;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-top: 8vw;
}

.file-upload-sub {
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-top: 8vw;
}

.file-upload:hover {
  border-color: #da6a26;
}

.file-upload input[type="file"] {
  display: none;
}

.file-upload button {
  filter: drop-shadow(0 15px 25px rgba(222, 98, 7, 0.15));
  display: inline-block;
  border: none;
  background: #da6a26;
  color: white;
  padding: 15px 40px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 50px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  justify-content: center;
}

.file-upload button:disabled {
  background-color: #ccc;
  /* Change this to your preferred disabled color */
  cursor: not-allowed;
}

.file-upload button:hover {
  background-color: #333;
}

.file-upload ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
}

.file-upload li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.file-upload li:hover {
  background-color: #f1f1f1;
}

.file-upload li button[title="Remove"] {
  background-color: #da6a26;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.file-upload li button[title="Remove"]:hover {
  background-color: #da6a26;
}

.file-upload p {
  color: #030a07;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
}

.scroll-class {
  /* height: min-content;
  overflow: scroll; */
  max-height: 150px;
  /* Set your desired max-height */
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 0;
  margin: 10px 0;
  list-style-type: none;
}

.scroll-class li {
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  border-bottom: 1px solid #eee;
}

h4 {
  font-size: 1.2em;
  font-weight: normal;
  color: #666;
  text-align: center;
  margin-bottom: 1em;
}
</style>