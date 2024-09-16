<template>
    <div class="uploader p-3 mt-4">
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <p class="mb-0">{{ currentStatus[status] }}</p>
            </div>
            <div v-if="status == 1 || status == 5">
                <div class="action-holder">
                    <span v-on:click="$emit('pauseUpload')" v-if="! isPaused" class="btn-action text-primary mr-2">
                        <i class="ion-ios-pause"></i>
                    </span>
                    <span v-on:click="$emit('startUpload')" v-if="isPaused" class="btn-action text-primary mr-2">
                        <i class="ion-ios-play"></i>
                    </span>
                    <span v-on:click="$emit('cancelUpload')" class="btn-action __danger text-danger">
                        <i class="ion-close-round"></i>
                    </span>
                </div>
            </div>

            <div v-if="status === 2">
                <div class="action-holder">
                    <span class="btn-action __success text-white">
                        <i class="ion-checkmark-round"></i>
                    </span>
                </div>
            </div>

            <div v-if="status == 3 || status == 4">
                <div class="action-holder">
                    <span class="btn-action __danger text-danger">
                        <i class="ion-close-round"></i>
                    </span>
                </div>
            </div>
        </div>
        <div v-if="status == 1 || status == 5" class="progress mt-4" style="height: 2px;">
            <div class="progress-bar" role="progressbar" :style="{width: progress + '%'}" aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Uploader',

    props: [
        'status', 'progress', 'isPaused'
    ],

    data() {
        return {
            currentStatus: ['Initializing ..', 'Uploading ..', 'Upload Successful', 'File upload cancelled', 'Failed to upload', 'Paused']
        }
    }
}
</script>
<style>
.uploader {
    border: 1px solid #edf4f1;
    border-radius: 10px;
}
.btn-action {
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: #efefef;
    border-radius: 50%;
    cursor: pointer;
}
.btn-action.__danger {
    background: #F8D7DA;
}
.btn-action.__success {
    background: #28A745;
}
</style>