<template>
  <!-- <MenuBar /> -->
  <XmlandFileDif />
  <ReportTemplate :table-props="xmlColumns" />
  <CanvasView :upload-configs="uploadConfigs" />
</template>


<script>
import "vue3-toastify/dist/index.css";
import CanvasView from "./CanvasView.vue";
import XmlandFileDif from '../components/XmlandFileDifMenu.vue'
import ReportTemplate from "./ReportTemplate.vue";
import Store from '../vuex/store'
import { type } from "./util";
export default {
  // name: "ConverterView",
  name: "XmlTransformView",
  components: {
    ReportTemplate,
    XmlandFileDif,
    CanvasView
  },
  computed: {
    userId() {
      return Store.getters.getUserId;
    },
    requestId() {
      return Store.getters.getRequestId;
    },
  },

  data() {
    return {
      
      uploadConfigs : {
          action: "transform",
          actionLabel : "Transform",
          title:  "XML Transform",
          type : type.XML,
          accept : ".xml",        
      },

      xmlColumns: {
        type: type.XML,
        configs: [
          {
            name: "remarks",
            label: "Remarks",
            order: 6,
            sort: true
          },
          {
            name: "lastModifiedDate",
            label: "Last Modified Date",
            order: 5,
            sort: true,
            type: "date"
          },
          {
            name: "status",
            label: "Status",
            order: 4,
            sort: true,
            default: true,
            type: 'status'
          },
          {
            name: "requestDate",
            label: "Request Date",
            order: 2,
            sort: true,
            default: true,
            type: "date"
          },

          {
            name: "xmlFileName",
            label: "Filename",
            order: 3,
            sort: true,
            default: true,
          },

          {
            name: "requestId",
            label: "Request ID",
            order: 1,
            sort: true
          },

        ],
        actions:{
        download: true,
        delete: true,
      },
      },

      
    };
  },

    // computed: {

  // },

  // created() {
  //   this.myComputed = this.computedData;
  // },

  // watch: {
  //   userId: function () {
  //     return Store.getters.getUserId;
  //   },
  //   requestId: function () {
  //     return Store.getters.getRequestId;
  //   },
  // },
};
</script>
