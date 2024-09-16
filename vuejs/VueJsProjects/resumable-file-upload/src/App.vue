<template>
    <div id="app" class="h-100">
        <div class="container-fluid h-100">
            <div class="row h-100">
                <div class="col-md-3 vue-bg h-100 d-flex justify-content-center align-items-center">
                    <img alt="Vue logo" src="./assets/logo.png" width="100">
                </div>
                <div class="col-md-9 h-100 d-flex justify-content-center align-items-center">
                    <div class="col-md-8 rounded p-5 shadow bg-white text-left">
                        <h2 class="text-center mb-5">Resumable File Upload</h2>
                        <div id="dropzone" class="dropzone p-5">
                            <span class="mb-4"><i class="ion-ios-copy-outline text-primary" style="font-size:4.5em;"></i></span>
                            <p class="mb-0 font-weight-bold text-muted">Drag your file here</p>
                        </div>
                        <transition name="fade" mode="out-in">
                            <Uploader v-if="currentStatus != null"
                                :status="currentStatus"
                                :progress="fileProgress"
                                :isPaused="isPaused"
                                v-on:pauseUpload="triggerPauseUpload"
                                v-on:startUpload="triggerStartUpload"
                                v-on:cancelUpload="triggerCancelUpload"
                            />
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Resumable from 'resumablejs'
import Uploader from './components/Uploader.vue'

const STATUS_INITIAL    = 0;
const STATUS_SAVING     = 1;
const STATUS_SUCCESS    = 2;
const STATUS_CANCEL     = 3;
const STATUS_FAILED     = 4;
const STATUS_PAUSED     = 5;

const API = `http://localhost:8080/api`;

export default {
    name: 'App',

    components: {
        Uploader
    },

    data() {
        return {
            currentStatus: null, 
            uploadField: '',
            fileUploader: null,
            fileProgress: 0, 
            isPaused: 0
        }
    },

    mounted() {
        var v = this;

        v.reset();
        v.fileUploader = new Resumable({
            target: API + '/upload'
        });

        v.fileUploader.assignDrop(document.getElementById('dropzone'));
        v.fileUploader.on('fileAdded', v.fileAddedToUpload);
        v.fileUploader.on('fileSuccess', v.fileUploadSuccess);
        v.fileUploader.on('fileError', v.fileUploadError);
        v.fileUploader.on('fileProgress', v.fileUploadingProgress);
        v.fileUploader.on('progress', v.fileUploadProgress);
    },

    methods: {

        reset() {
            this.currentStatus = null;
        }, 

        triggerStartUpload() {
            this.fileUploader.upload();
            this.currentStatus = STATUS_SAVING;
            this.isPaused = false;
        },

        triggerPauseUpload() {
            this.fileUploader.pause();
            this.currentStatus = STATUS_PAUSED;
            this.isPaused = true;
        },

        triggerCancelUpload() {
            this.fileUploader.cancel();
            this.currentStatus = STATUS_CANCEL;
            // this.reset();
        },

        fileAddedToUpload() {
            this.currentStatus = STATUS_INITIAL;
            this.fileUploader.upload();
        }, 

        fileUploadSuccess() {
            this.currentStatus = STATUS_SUCCESS;
        }, 

        fileUploadError() {
            this.currentStatus = STATUS_FAILED;
        },

        fileUploadingProgress() {
            this.currentStatus = STATUS_SAVING;
        },

        fileUploadProgress() {
            this.fileProgress = this.fileUploader.progress() * 100;
        }
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
.dropzone {
    border: 3px dashed #edf4f1;
    cursor: pointer;
    border-radius: 20px;
    text-align: center;
}
.vue-bg {
    background: #bce5d0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
