<template>
  
  <div  style="width: 100%;"> 
                <button class="btn3" @click="this.$router.go(-1)">
                    <span><i class="fa fa-arrow-left fa-3x"></i></span>
                </button>
                <h1 style=" float: right;  margin-right: 50%;">Trash </h1>
            </div>
            
  <ReportTemplate :table-props="xslColumns" />
</template>


<script>
import "vue3-toastify/dist/index.css";
import ReportTemplate from "./ReportTemplate.vue";
import Store from "../vuex/store.js";
import { type } from "./util";
export default {
  name: "TrashView",
  watch: {
    userId: function () {
      return Store.getters.getUserId;
    },
    requestId: function () {
      return Store.getters.getRequestId;
    },
  },
  data() {
    return {
      xslColumns: {
        type: type.XSL,
        filters: [{ isDeleted: true }],
        configs: [
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
            default: true,
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
            default: true,
          },
        ],
        actions: {
          restore: true,
        },
      },
    };
  },
  components: {
    ReportTemplate,
  },
};
</script>
<style>

.btn3 {
    margin-left: 3%;
    border-radius: 50% !important;
    background-color: rgba(255, 255, 255, 0.2);
    color: black;
    border: none !important;
    /* padding:  30px !important; */
    -webkit-transition: background-color 1s, color 1s, -webkit-transform 0.5s;
    transition: background-color 1s, transform 0.5s;
    box-shadow: 5px 0px 18px 0px rgba(105, 105, 105, 0.8);
}

.btn3:hover {
    -webkit-transform: translateX(-5px);
}

.fa-3x {
    font-size: 2.5rem;
}
</style>
