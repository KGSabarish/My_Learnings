<template >
  <!-- <UploadTemplate :upload-props="uploadConfigs"/> -->
  <div v-if="status">
    <ReportTemplate :table-props="xslColumns" />
    <CanvasView :upload-configs="uploadConfigs" />
  </div>
</template>


<script>
// import UploadTemplate from './UploadTemplate.vue'
import "vue3-toastify/dist/index.css";
import ReportTemplate from "./ReportTemplate.vue";
import CanvasView from "./CanvasView.vue";
import Store from "../vuex/store.js";
import { type } from "./util";
export default {
  name: "ConverterView",
  methods: {
    setValuesToStore(type) {
      Store.commit("setType", type);
    },
    callback() {
      const params = new URLSearchParams(window.location.search);
      const status = params.get("status");
      console.log("Status ", status);
      if (status === "success") {
        this.status = true;
        // Handle successful login
        const userId = params.get("user_id");
        console.log("User Id ", userId);
        // Store userId or fetch additional data
      } else if (status === "fail") {
        this.status = false;
        // Handle error
        const message = params.get("message");
        this.$router.push({
          name: "LoginView",
        });
        alert( message);
      }
    },
  },
  components: {
    ReportTemplate,
    CanvasView,
    // UploadTemplate
  },
  mounted() {
    this.callback()
    this.setValuesToStore(type.XSL);
  },

  data() {
    return {
      status: true,
      uploadConfigs: {
        action: "convert",
        actionLabel: "Convert",
        title: "XSL Converter",
        type: type.XSL,
        accept: ".xsl",
      },
      xslColumns: {
        type: type.XSL,
        configs: [
          {
            name: "dependentFunctionList",
            label: "Dependent Functions",
            order: 13,
            sort: true,
          },
          {
            name: "customFunctionList",
            label: "Custom Functions",
            order: 12,
            sort: true,
          },
          {
            name: "unAvailableFunctionList",
            label: "Unavailable Functions",
            order: 11,
            sort: true,
          },
          {
            name: "nonConvertedCount",
            label: "Non Converted Count",
            order: 10,
            sort: true,
          },
          {
            name: "remarks",
            label: "Remarks",
            order: 9,
            sort: true,
          },
          {
            name: "lastModifiedDate",
            label: "Last Modified Date",
            order: 8,
            sort: true,
            type: "date",
          },
          {
            name: "accuracy",
            label: "Accuracy",
            order: 7,
            default: true,
            formula: {
              expression: "tibcoCount / convertedCount * 100",
              roundTo: 2,
            },
            suffix: "%",
          },
          {
            name: "convertedCount",
            label: "Converted Count",
            order: 6,
            sort: true,
          },
          {
            name: "tibcoCount",
            label: "Tibco Count",
            order: 5,
            sort: true,
          },
          {
            name: "status",
            label: "Status",
            order: 4,
            sort: true,
            default: true,
          },
          {
            name: "xslFileName",
            label: "Filename",
            order: 3,
            sort: true,
            default: true,
            checked: true,
          },
          {
            name: "requestDate",
            label: "Request Date",
            order: 2,
            sort: true,
            default: true,
            type: "date",
          },
          {
            name: "requestId",
            label: "Request ID",
            order: 1,
            sort: true,
          },
        ],
        actions: {
          download: true,
          diff: true,
          transform: true,
          delete: true,
        },
      },
    };
  },
};
</script>
