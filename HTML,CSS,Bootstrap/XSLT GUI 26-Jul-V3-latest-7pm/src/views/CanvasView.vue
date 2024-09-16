<template>

  <div class="hoverableSidebarMenu ">
    <div class="xsl-converter-sidebar-menu   " data-bs-toggle="offcanvas" data-bs-target="#uploadCanvas"
      aria-controls="staticBackdrop">
      <span class="label  ">{{ uploadConfigs.title }}</span>
      <img v-if= "uploadConfigs.action=='transform'" class= " " src="../assets/icons/xml-icon.svg" alt= " " />
      <img v-else-if= "uploadConfigs.action=='convert'" class= " " src="../assets/icons/xsl-icon.svg" alt= " " />
    </div>
  </div>

  <!-- OffCanvas Start -->

  <div class="offcanvas offcanvas-end" data-bs-backdrop="static" tabindex="-1" id="uploadCanvas"
    aria-labelledby="staticBackdropLabel">
    <div class="offcanvas-header">
      <h3 class="offcanvas-title" id="staticBackdropLabel">{{ uploadConfigs.title }}</h3>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <UploadTemplate :upload-configs="uploadConfigs"/>
    </div>
  </div>
  <!-- OffCanvas End -->
</template>
<script>
import UploadTemplate from './UploadTemplate.vue'

import { action } from './util'
export default {
  name: "OffCanvas",
  props:{
    uploadConfigs:{
      type: Object,
      required : true
    },
    

  },
  components: {
    UploadTemplate,
    
  },
  data() {
    return {
     temp:'../assets/icons/xml-icon.svg'
    };
  },
  methods: {
    handlePrimaryAction(data) {
      console.log(data);
      if (data.action === action.REPLACE) {
        //this.deleteRecord(data.userId, data.type, data.requestId);
      }
    },
  },
}
</script>
<style scoped>
.xml-tranform-sidebar-menu,
.xsl-converter-sidebar-menu {
  top: 25%;
  position: absolute;
  right: 0;
  transform: translateY(-50%);
  width: 50px;
  /* height: 50px; */
  /* background-color: #007bff; */
  color: #f0ece5;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  /* transition: width 0.3s; */
  border-radius: 10px;
  background-color: #1D2856;

  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 3;
}

.xml-tranform-sidebar-menu img,
.xsl-converter-sidebar-menu img {
  height: 4vh;
}

.xml-tranform-sidebar-menu:hover,
.xsl-converter-sidebar-menu:hover {
  width: 10vw;
}

.xml-tranform-sidebar-menu:hover .label,
.xsl-converter-sidebar-menu:hover .label {
  display: block;
}

.label {
  display: none;
  padding-right:5px;
  /* margin-left: 10px; */
}

.xml-tranform-sidebar-menu {
  top: 35%;
}
</style>