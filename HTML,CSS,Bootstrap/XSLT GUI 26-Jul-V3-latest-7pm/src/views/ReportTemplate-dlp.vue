<template>
  <!-- <MenuBar /> -->
  <ConfirmModal
    :popup="popup"
    @executePrimaryAction="handlePrimaryAction"
    ref="openModalBox"
  />

  <div class="container-fluid mt-3">
    <div class="row">
      <div class="report col">
        <!-- <div class="row"> -->
        <div class="report-filter-bar row  mb-3 row-cols-xxl-6 row-cols-md-3">
          
          <!-- style="border:1px solid green" -->
          <!-- Column Selection Block-->
          <div class="col btn-group">
            <button type="button" class="btn1 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <p class="filter-label">Column Selections</p>
            </button>
            <ul class="dropdown-menu">
              <br />
              <li>
                <a class="dropdown-item" href="#">
                  <label>
                    <input
                      type="checkbox"
                      :value="'*'"
                      v-model="selectedColumns"
                      @change="handleColumnChange('*')"
                    />
                    Select All
                  </label>
                </a>
              </li>
              <li v-for="(column, index) in tableConfigs" :key="index">
                <a class="dropdown-item" href="#">
                  <label>
                    <input
                      type="checkbox"
                      :value="column.name"
                      :disabled="column.checked"
                      
                      v-model="selectedColumns"
                      @change="handleColumnChange(column.name)"
                    />
                    {{ column.label }}
                  </label>
                </a>
              </li>
            </ul>
          </div>

          <!-- Conversion Status Block -->
          <div class="col btn-group divalignleft">
            <button type="button" class="btn2 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              Conversion Status
            </button>
            <ul class="dropdown-menu">
              <br />
              <li>
                <a class="dropdown-item" href="#">
                  <label>
                    <input
                      type="checkbox"
                      :value="'*'"
                      v-model="selectedFilter"
                      @change="handleStatusChange('*')"
                    />
                    Select All
                  </label>
                </a>
              </li>
              <li v-for="(status, name) in this.$statuses" :key="name">
                <a class="dropdown-item" href="#">
                  <label>
                    <input
                      type="checkbox"
                      :value="status.name"
                      v-model="selectedFilter"
                      @change="handleStatusChange(status.name)"
                    />
                    {{ status.label }}
                  </label>
                </a>
              </li>
            </ul>
          </div>
          <!-- Sort Block -->
          <div class="col sort divalignleft">
            <div class="row">
              <div class="col-1">
                <label class="sortlbl">Sort</label>
              </div>
              <!-- SortBy Dropdown Block -->
              <div class="col-6 sortbydd">
                <div class="btn-group">
                  <button
                    type="button"
                    class="sortbtn dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {{ sorByDropdown }}
                  </button>
                  <ul class="dropdown-menu">
                    <li v-for="(column, index) in columns.sort" :key="index">
                      <a
                        class="dropdown-item"
                        href="#"
                        @click="handleSortByChange(column.name, column.label)"
                        >{{ column.label }}</a
                      >
                    </li>
                  </ul>
                </div>
              </div>

              <!--Order DropDown Block -->
              <div class="col sortOrderdd">
                <div class="btn-group">
                  <button
                    type="button"
                    class="sortbtn dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {{ orderDropdown }}
                  </button>
                  <ul class="dropdown-menu">
                    <li v-for="(sortOrder, index) in sortOrders" :key="index">
                      <a
                        class="dropdown-item"
                        href="#"
                        @click="
                          updateFilterSortOrder(sortOrder.name, sortOrder.label)
                        "
                        >{{ sortOrder.label }}</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!--Empty Block-->
          <!-- <div class="col-1 empty">

          </div> -->

          <!-- Search Block -->
          <div class="col srch srchalign">
            <form class="d-flex" @submit.prevent="performSearch">
              <button
                class="btn btn-primary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span>{{ searchConcept }}</span>
              </button>
              <ul class="dropdown-menu mt-2 search">
                <li
                  v-for="(searchColumns, index) in columns.search"
                  :key="index"
                >
                  <a
                    class="dropdown-item mt-1"
                    href="#"
                    @click="setSearchFilter(searchColumns)"
                    >{{ searchColumns.label }}</a
                  >
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li><a class="dropdown-item mt-1" href="#" @click="setSearchFilter('All Categories')">All Categories</a>
                </li>
              </ul>
              <input class="form-control srchip" style="" v-model="searchQuery" type="search" placeholder=""
                aria-label="Search" />
              <button class="btn btn-outline-dark" type="button" @click="search">
                Search
              </button>
            </form>
          </div>

          <!-- Clear Filter Block -->
          <div class="col clrdiv">
            <div class="row">
              <button class="clrbtn" @click="clearFilters">Clear Filters</button>
            </div>
          </div>
          <!-- <div class="submit-btn col-2" id="submitbtn">
            <button
              class="subitbtn btn-primary"
              id="submitBtn"
              @click="submitFilter()"
            >
              Submit
            </button>
          </div> -->
        </div>
        <div v-if="loading" class="loading-container">
          <img
            id="loading-image"
            class="loading-gif"
            src="../assets/ajax_loader.gif"
            alt="Loading..."
          />
        </div>
        <div v-else class="table-responsive">
          <table class="table table-hover table-borderless custom-table">
            <thead>
              <tr>
                <th
                  v-for="(header, name) in selectedConfigs"
                  :key="name"
                  scope="col"
                  class="col align-middle table-header-sticky"
                >
                  {{ header.label }}
                </th>

                <th
                  scope="col"
                  class="col align-middle cus-table-header-sticky"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr
                v-for="transaction in reportTransactions.transactions"
                :key="transaction.requestId"
              >
                <td v-for="column in selectedConfigs" :key="column.name">
                  <!-- {{ transaction.requestId }} -->
                  {{ getTableData(transaction, column) }}
                </td>

                <td class="sticky">
                  <div class="row">
                    <div
                      class="col d-flex flex-column align-items-center sticky-column"
                      v-if="tableProps.actions.download"
                    >
                      <button
                        type="button"
                        class="btn btn-lg btn-download"
                        @click="
                          download(
                            setDownloadData(
                              reportTransactions.userId,
                              transaction
                              
                            )
                          )
                        "
                        :disabled="transaction.status != 'ok'"
                      ></button>
                      <span>Download</span>
                    </div>
                    <div
                      class="col d-flex flex-column align-items-center"
                      v-if="tableProps.actions.diff"
                    >
                      <button
                        type="button"
                        class="btn btn-lg btn-show-difference"
                        @click="
                          setValuesToStore(
                            'showDifference',
                            reportTransactions.userId,
                            transaction.requestId,
                            transaction.xslFileName
                          )
                        "
                        :disabled="transaction.status != 'ok'"
                      ></button>
                      <span>Show Difference</span>
                    </div>
                    <div
                      class="col d-flex flex-column align-items-center"
                      v-if="tableProps.actions.transform"
                    >
                      <button
                        type="button"
                        class="btn btn-lg btn-transform"
                        @click="
                          setValuesToStore(
                            'xmlTransform',
                            reportTransactions.userId,
                            transaction.requestId,
                            transaction.xslFileName
                          )
                        "
                        :disabled="transaction.status != 'ok'"
                      ></button>

                      <span>XML Tranform</span>
                    </div>
                    <div
                      class="col d-flex flex-column align-items-center"
                      v-if="tableProps.actions.delete"
                    >
                      <button
                        type="button"
                        class="btn btn-lg btn-delete"
                        @click="
                          confirmDelete(
                            reportTransactions.userId,
                            transaction.requestId.toString()
                          )
                        "
                      ></button>
                      <span>Delete</span>
                    </div>
                    <div
                      class="col d-flex flex-column align-items-center"
                      v-if="tableProps.actions.restore"
                    >
                      <button
                        type="button"
                        class="btn btn-lg btn-restore"
                        @click="
                          restore(
                            reportTransactions.userId,
                            tableProps.type,
                            transaction.requestId
                          )
                        "
                        :disabled="transaction.status != 'ok'"
                      ></button>
                      <span>Restore</span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="col d-flex flex-column align-items-center" v-if="$parent.$options.name!='TrashView'">
      
      <button
        type="button"
        class="btn btn-lg btn-trash"
        @click="setValuesToStore('trashView', reportTransactions.userId)"
      ></button>
      <span>Trash</span>
    </div>
  </div>
  
</template>


<script>
import Store from "../vuex/store.js";
// import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import {
  action,
  elementsToRemoveFromArray,
  invalidBEColumns,
  supportingColumns,
  CONVERSION_STATUS,
} from "./util.js";
import {  evaluate } from "mathjs";
import ConfirmModal from "../components/ConfirmModal.vue";
import  {getCookie} from "../cookie.js";

export default {
  name: "ConverterView",
  props: ["tableProps"],
  data() {
    return {
      searchName: '',
      searchConcept: 'All Categories',
      searchQuery: '',
      tableConfigs: {},
      selectedConfigs: {},
      columns: {
        default: {},
        sort: {},
        search: {},
      },
      files: [],
      filterSortColumn: { name: "lastModifiedDate", label: "Last Modified Date" },
      filterSortOrder: { name: "desc", label: "Descending" },
      reportTransactions: "",
      sortOrders: [
        { name: "asc", label: "Ascending" },
        { name: "desc", label: "Descending" },
      ],
      userId: getCookie("userId"),
      uploadSuccessMessage: "",
      uploadErrorMessage: "",
      loading: false,
      selectedFilter: ["ok", "new", "fail", "in-prog"],
      reportTimeInteral: false,
      selectedColumns: [],
      popup: {},
    };
  },
  components: {
    ConfirmModal,
  },

  computed: {
    sorByDropdown() {
      return this.filterSortColumn.label || "Sort By";
    },
    orderDropdown() {
      return this.filterSortOrder.label || "Order";
    },
    requestId() {
      return Store.getters.getRequestId;
    },
  },
  async mounted() {
    console.log('Parent component:', this.$parent.$options.name);
    this.refresh();
    this.copyProps();
    this.search();
  },
  unmounted() {
    clearInterval(this.reportTimeInteral);
  },
  methods: {
    
    clearFilters() {
      
      this.selectedFilter = ["*", "ok", "new", "fail", "in-prog"]
      this.copyProps();
      this.filterSortColumn = { name: "lastModifiedDate", label: "Last Modified Date" };
      this.filterSortOrder = { name: "desc", label: "Descending" };
      this.searchName = '';
      this.searchConcept = 'All Categories';
      this.searchQuery = '';
      this.search();
    },

    // async search() {


    //   if (this.searchQuery == "") {
    //     this.showError("Search Column is empty.Please type and search");

    //   }
    //   let searchValues = { "queryValue": this.searchQuery };
    //   if (this.searchName != '') {
    //     searchValues = { ...searchValues, ...{ queryColumn: this.searchName } }
    //     console.log("SearcValue", searchValues)
    //   }
    //   this.report(searchValues);
    // },
    setSearchFilter(filter) {
      if (filter == 'All Categories') {
        this.searchConcept = filter;
      } else {
        this.searchConcept = filter.label;
      }
      this.searchName = filter.name;
    },
    openModal() {
      this.$refs.openModalBox.openModal();
    },
    evaluateFormula(formula, row) {
      try {
        let result = evaluate(formula.expression, row);
        if (formula.roundTo) {
          result = this.roundTo(result, formula.roundTo);
        }
        return result;
      } catch (error) {
        console.error(`Error evaluating formula: ${formula}`, error);
        return "Error";
      }
    },
    roundTo(num, precision) {
      const factor = Math.pow(10, precision);
      return Math.round(num * factor) / factor;
    },
    getTableData(record, column) {
       
      let value = record[column.name];
      // Status Enum Implementation start
      if (column.name == "status" && record.status) {
        // console.log("Column", column);
        // console.log("record", record);
          let conv_status = CONVERSION_STATUS.getByValue(record.status);
        //console.log("Conv status", conv_status);
        value = conv_status.name;
        //console.log("value of status", value);
        
        
      } // Status Enum Implementation start

      if (column.type == "date") {
        value = this.convertToLocalTimeAndFormat(value);
      } else if (column.formula) {
        value = this.evaluateFormula(column.formula, record);
      }
      // if(column.name == 'customFunctionList'){
      //   value = value.split(',').map(item => `• ${item.trim()}`).join('\n');
      // }

      if (column.suffix) {
        value = value + column.suffix;
      }

      return value;
    },
    setValuesToStore(processBtn, userId, requestId, convertedFileName) {
      
      Store.commit("setUserId", userId);
      Store.commit("setRequestId", requestId);
      Store.commit("setConvertedFileName", convertedFileName);
      // console.log("Selected button:", processBtn);
      if (processBtn == "showDifference") {
        // console.log("show difference if condition is invoked ");
        this.showDifference();
      }
      if (processBtn == "xmlTransform") {
        // console.log("XmlTransform if condition is invoked ");
        this.xmlTransform();
      }
      if (processBtn == "trashView") {
        // console.log("trashView if condition is invoked");
        this.trashView();
      }
      // this.$router.push("/compare");
    },
    copyProps() {
      this.tableConfigs = [...this.tableProps.configs].sort(
        (a, b) => a.order - b.order
      );
      this.selectedConfigs = this.tableConfigs.filter(
        (column) => column.default
      );
      // console.log("Selected Columns ", this.selectedConfigs);
      // this.columns.default = this.tableConfigs
      //   .filter((item) => item.default)
      //   .map(({ name, label }) => ({ name, label }))

      this.columns.sort = this.tableConfigs
        .filter((item) => item.sort)
        .map(({ name, label }) => ({ name, label }));

      this.selectedColumns = this.selectedConfigs.map((column) => column.name);
      // console.log("before get search:", this.tableConfigs);

      this.columns.search = this.tableConfigs
        .filter((item) => item.search != false)
        .map(({ name, label }) => ({ name, label }));
      // console.log("Search Columns:", this.columns.search);
    },
    async xmlTransform() {
      this.$router.push({
        name: "XmlTransformView",
      });
    },
    async trashView() {
      this.$router.push({
        name: "TrashView",
      });
    },
    handleSortByChange(name, label) {
      this.filterSortColumn.name = name;
      this.filterSortColumn.label = label;
      this.search();
    },
    updateFilterSortOrder(name, label) {
      this.filterSortOrder.name = name;
      this.filterSortOrder.label = label;
      this.search();
    },
    convertToLocalTimeAndFormat(databaseDateString) {
      const dateObject = new Date(databaseDateString);

      // Convert to local time
      const localDateObject = new Date(
        dateObject.getTime() - dateObject.getTimezoneOffset() * 60000
      );

      return this.formatDate(localDateObject);
    },
    formatDate(dateTimeString) {
      const dateObject = new Date(dateTimeString);
      const formattedDate = `${this.formatTwoDigits(
        dateObject.getMonth() + 1
      )}-${this.formatTwoDigits(
        dateObject.getDate()
      )}-${dateObject.getFullYear()} ${this.formatTwoDigits(
        dateObject.getHours()
      )}:${this.formatTwoDigits(
        dateObject.getMinutes()
      )}:${this.formatTwoDigits(dateObject.getSeconds())}`;
      return formattedDate;
    },
    formatTwoDigits(value) {
      return value.toString().padStart(2, "0");
    },
    confirmDelete(userId, requestId) {
      let data = {
        userId,
        action: action.DELETE,
        type: this.tableProps.type,
        requestId,
      };
      this.setConfirmModalValues(
        "Delete Confirmation",
        "Are you sure want to delete ?",
        "Delete",
        "Cancel",
        data
      );
      this.openModal();
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
      // this.$refs.openModalBox.setModalValues(confirmModalData);
    },

    handleColumnChange(value) {
      if (value === "*") {
        if (this.selectedColumns?.length === this.tableConfigs?.length) {
          
          //this.selectedColumns = [];
           this.selectedColumns = this.tableConfigs.filter((column)=> column.checked).map((item)=> item.name)
            console.log("selected Columns",this.selectedColumns)
        } else if (
          this.selectedColumns?.length <=
          this.tableConfigs?.length - 2
        ) {
          this.selectedColumns = this.tableConfigs.map(
            (column) => column?.name
          );
          this.selectedColumns.push("*");
        }
      }
      if (value !== "*") {
        this.selectedColumns = this.selectedColumns.filter(
          (selectedColumn) => selectedColumn !== "*"
        );
      }

      this.selectedValidColumns = this.selectedColumns.filter(
        (column) => column !== "*"
      );
      
      // console.log("selected Columns in handle before", this.selectedColumns);
      // console.log(
      //   "selected valid Columns in handle before",
      //   this.selectedValidColumns
      // );
      this.selectedConfigs = this.tableConfigs.filter((column) =>
        this.selectedColumns.includes(column.name)
      );
      // console.log(
      //   "selectedConfigs",
      //   this.selectedConfigs
      // );
      this.search();
    },
    handleStatusChange(value) {
      if (value === "*") {
        if (this.selectedFilter?.length === this.$statuses?.length) {
          // this.selectedFilter = [];
          this.selectedFilter = this.$statuses.filter((item)=> item.name == 'ok').map((item)=> item.name)
        } else {
          this.selectedFilter = this.$statuses?.map((status) => status.name);
          this.selectedFilter.push("*");
        }
      }
      if (value !== "*") {
        this.selectedFilter = this.selectedFilter.filter(
          (statusFilter) => statusFilter !== "*"
        );
      }
      console.log("Selected Filters", this.selectedFilter);
      this.search();
    },
    showSuccess(message) {
      toast.success(message, {
        autoClose: 3000,
      });
    },
    showError(message) {
      toast.error(message, {
        autoClose: 3000,
      });
    },

    handlePrimaryAction(data) {
    
      if (data.action === action.DELETE) {
        this.deleteRecord(data.userId, data.type, data.requestId);
      }
    },
    // async deleteRecord(userId, type, requestId) {
    //   const body = {
    //     userId,
    //     type,
    //     requestId: [requestId],
    //   };

    //   try {
    //     const response = await axios.post(process.env.VUE_APP_BASE_URL+"/dev/delete", body);

    //     if (response.status === 200) {
    //       this.search();

    //       this.showSuccess(response.data.message);
    //     } else {
    //       this.showError(response.data.message);
    //     }
    //   } catch (error) {
    //     console.error("Delete failed:", error);
    //   }
    // },
    // async restore(userId, type, requestId) {
    //   // console.log("User ID is " + userId);
    //   // console.log("file type is " + type);
    //   // console.log("Request ID is " + requestId);

    //   const body = {
    //     userId,
    //     type,
    //     requestId: [requestId],
    //   };

    //   try {
    //     const response = await axios.post(process.env.VUE_APP_BASE_URL+"/dev/restore", body);

    //     if (response.status === 200) {
    //       this.search();

    //       this.showSuccess(response.data.message);
    //     } else {
    //       this.showError(response.data.message);
    //     }
    //   } catch (error) {
    //     console.error("restore failed:", error);
    //   }
    // },
    removeInvalidBEColumns(targetArray) {
      return targetArray.filter(
        (element) => !elementsToRemoveFromArray.includes(element)
      );
    },
    addUniqueElements(array, elements) {
      array.push(...elements);
      const uniqueElements = new Set(array);
      return Array.from(uniqueElements);
    },

    // async search() {
      
    //   // console.log("Selected Colums in report ", this.selectedColumns);
    //   // if (this.searchQuery == "") {
    //   //   this.showError("Search Column is empty.Please type and search");
    //   // }

    //   let searchValues = { "queryValue": this.searchQuery };

    //   if (this.searchName != '') {
    //     searchValues = { ...searchValues, ...{ queryColumn: this.searchName } }
    //   }

    //   let fields = [...this.selectedColumns];
    //   console.log("Table props below ");
    //   console.log(this.tableProps.filters);
    //   let isDeleteProps = false;

    //   if (Array.isArray(this.tableProps.filters)) {

    //     isDeleteProps = this.tableProps.filters.some(
    //       (filter) => filter.isDeleted === true
    //     );
    //   }

    //   // Construct the filters array with the specified structure
    //   const filters = [
    //     { isDeleted: isDeleteProps },
    //     { status: this.removeInvalidBEColumns(this.selectedFilter) },
    //   ];
    //   if (this.tableProps.type == "xml") {
    //     filters.push({
    //       xslId: this.requestId,
    //     });
    //   }

    //   // Log the filters to check the structure
    //   console.log(filters);

    //   fields = this.addUniqueElements(
    //     fields,
    //     supportingColumns[this.tableProps.type]
    //   );
    //   // var api = "/report";
    //   let invalidColumns = invalidBEColumns[this.tableProps.type];
    //   fields = fields.filter((column) => !invalidColumns.includes(column));
    //   console.log("Fields :", fields)

    //   let payload = {
    //     userId: this.userId,
    //     type: this.tableProps.type,
    //     fields: fields,
    //     filters: filters,
    //     sort: {
    //       field: this.filterSortColumn.name,
    //       order: this.filterSortOrder.name,
    //     },
    //     pagination: {
    //       page: 1,
    //       pageSize: 20,
    //     },
    //   };


    //   // console.log("Selected Colums in report after delete ", this.selectedColumns);
    //   if (searchValues != null) {
    //     payload = { ...payload, ...searchValues }
        

    //   }
    //   await axios
    //     .post(process.env.VUE_APP_BASE_URL+"/dev/search", payload, {})
    //     .then((response) => {
    //       if (response.status == 200 && this.reportTimeInteral == false) {
    //         // this.reportTimeInteral = true;
    //         // console.log(this.response);
    //         // this.reportTimeInteral = setInterval(() => {
    //         //   this.search();
    //         // }, 5000);
    //       }
    //       console.log(response);
    //       console.log("ReportTemplate");
    //       this.reportTransactions = response.data;
    //     })
    //     .catch((error) => {
    //       if (error.response) {
    //         // The server responded with a status code outside the 2xx range
    //         console.log("Error response:", error.response);
    //       } else if (error.request) {
    //         // The request was made but no response was received
    //         console.log("Error request:", error.request);
    //       } else {
    //         // Something happened in setting up the request that triggered an error
    //         console.log("Error message:", error.message);
    //       }
    //     })
    //     .finally(() => {
    //       // Set loading state to false after request completes
    //       this.loading = false;
    //     });
    // },
    refresh() {
      this.loading = true;
    },
    setDownloadData(userId, transaction) {
      var fileName = ""
      if(this.tableProps.type == 'xsl'){
        fileName = transaction.xslFileName
      }else{
        fileName = transaction.xmlFileName
      }

      return {
        userId,
        requestId:transaction.requestId,
        fileName,
      };
    },

    // async download(data) {
    //   console.log(typeof requestId);
    //   let type = this.tableProps.type;
    //   this.showSuccess("Hang tight! Your download is on its way");
    //   try {
    //     const response = await axios.post(process.env.VUE_APP_BASE_URL+
    //       "/dev/download",
    //       {
    //         userId: data.userId,
    //         requestIds: [data.requestId],
    //         type,
    //       },
    //       {
    //         responseType: "blob",
    //       }
    //     );
    //     if (response.status == 200) {
    //       console.log("Converted file download successfully");
    //       console.log("Response", response);
    //     }

    //     // Get the blob from the response
    //     const blob = new Blob([response.data], { type: response.data.type });

    //     // Create a link element and trigger the download
    //     const url = window.URL.createObjectURL(blob);
    //     const a = document.createElement("a");
    //     a.href = url;
    //     a.download = data.fileName.replace("." + type, "") + ".zip";
    //     document.body.appendChild(a);
    //     a.click();
    //     document.body.removeChild(a);
    //     window.URL.revokeObjectURL(url);
    //   } catch (error) {
    //     console.error("There was an error downloading the file:", error);
    //   }
    // },

    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async showDifference() {
      this.$router.push({
        name: "FileDifferenceNew",
      });
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

    
  },
};
</script>

<style scoped>

/* Media Query Start */

 /* X-Small devices (portrait phones, less than 576px) */
 /* No media query for `xs` since this is the default in Bootstrap */

 /* Small devices (landscape phones, 576px and up) */
 @media (min-width: 576px) {


}

/* Medium devices (tablets, 768px and up) */
/* @media (min-width: 768px) {
  .filter-label{
    font-size: 15px;
    margin-top: 0px;
  }
 } */

/* Large devices (desktops, 992px and up) */
/* @media (min-width: 992px) { 
  .filter-label{
    font-size: 20px;
  }
 } */

/* X-Large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) { }

/* XX-Large devices (larger desktops, 1400px and up) */
@media (min-width: 1400px) { }
/* Media Query End */


/* Back Button Style Start */

.back-button {
    margin-left: 15%;
    border-radius: 50% !important;
    background-color: rgba(255, 255, 255, 0.2);
    color: black;
    border: none !important;
    /* padding:  30px !important; */
    -webkit-transition: background-color 1s, color 1s, -webkit-transform 0.5s;
    transition: background-color 1s, transform 0.5s;
    box-shadow: 5px 0px 18px 0px rgba(105, 105, 105, 0.8);
}

.back-button:hover {
    -webkit-transform: translateX(-5px);
}

.fa-3x {
  font-size: 2.5rem;
}

.search {
  overflow-y: scroll;
  height: 20rem;

}


.sortbtn:hover,
.sortbtn {
  background-color: white;
  border-color: white;
  /* border-radius: 6px; */
  height: 5vh;
  width: 8vw;
  color: #da6a26;
  text-align: center;
  font-weight: bolder;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 10px;
  /* margin-left: 1rem; */
  /* margin-right: 12rem; */
}

.sortlbl {
  text-align: center;
  padding-top: 12px;
  padding-right: 3px;
  padding-left: 2px;
  padding-bottom: 8px;
}

.sortbtn.show {
  background-color: white;
  color: #da6a26;
}

.subitbtn {
  background-color: #da6a26;
  color: white;
  border: none;
  border-radius: 7px;
  height: 6vh;
  width: 10vw;
  text-align: center;
  font-weight: bolder;
}

.sort .sortbtn {
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 10px;
  margin-left: 1rem;
}

.sort {
  width:22% !important; 
  margin-left: 0.8rem;
  background-color: #da6a26;
  color: white;
  border: none;
  align-content: space-evenly;
  border-radius: 7px;
  text-align: left;
  text-justify: left;
  font-weight: bolder;
  /* height: 3vh; */
  /* width: 11vw; */
  float: left;
  padding: 0px 32px 0px 12px !important;
  /* margin-left: -2.5rem; */
}

.label {
  display: none;
  margin-left: 10px;
}

.xml-tranform-sidebar-menu {
  top: 35%;
}

.submitbtn {
  align-content: center;
}

.loading-gif {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 130px;
  width: 130px;
}

.loading-gif img {
  max-width: 100%;
  /* Ensure the image scales properly */
  max-height: 100%;
  /* Ensure the image scales properly */
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
}

/* loading icon end */

.btn1 {
  /* margin-left: 0.8rem; */
  background-color: #da6a26;
  color: white;
  border: none;
  border-radius: 7px;
  height: 6vh;
  width: 11vw;
  /* height: 3vh;
  width: 11vw; */
  text-align: center;
  font-weight: bolder;
}


.btn2 {
  /* margin-left: 0.8rem; */
  background-color: #da6a26;
  color: white;
  border: none;
  border-radius: 7px;
  height: 6vh;
  width: 11vw;
  /* height: 3vh;
  width: 11vw; */
  text-align: center;
  font-weight: bolder;
}

.empty {
  margin-right: -11rem;
}

.srch {
  /* margin-left: 5rem;
  margin-right: 6rem; */
}

.clrbtn {
  background-color: #da6a26;
  color: white;
  border: none;
  margin-left: 8rem;
  border-radius: 7px;
  height: 6vh;
  width: 8vw;
  text-align: center;
  font-weight: bolder;
}

.report-filter-bar {
  /* border-radius: 10px; */
}

.cus-table-header-sticky {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;
}

.table-header-sticky {
  position: sticky;
  top: 0;
  z-index: 1;
  /* Ensures the header stays on top of other content */
}

/* diff container design start */
.diff-container {
  white-space: normal;
  margin-top: 20px;
}

/* Custom styles to decrease line spacing */
.diff-container .d2h-wrapper .d2h-side-by-side .d2h-code-side-line {
  padding: 2px 10px;
  /* Adjust the padding to reduce space */
}

.diff-container .d2h-wrapper .d2h-side-by-side .d2h-code-line {
  margin: 0;
  /* Remove the default margin */
}

.diff-container .d2h-wrapper .d2h-side-by-side td.d2h-code-side-linenumber {
  padding: 2px 5px;
  /* Adjust the padding of line numbers */
}

/* diff container design end */
.fileName-align {
  text-align: left;
}

.table-group-divider span {
  font-size: 10px;
}

/* table design start */

.custom-table {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.custom-table th,
.custom-table td {
  /* text-align: left; */
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
}

.custom-table th {
  background-color: #da6a26;
  color: whitesmoke;
}

.table-responsive {
  text-align: center;
  position: relative;
  max-height: 85%;
}

table,
th,
td {
  border: 1px;
}

.xml-tranfomer-dropdown-upload-icon {
  margin-left: 0px;
}

.xml-tranfomer-dropdown-para {
  margin-left: 10px;
}

.btn-download {
  background: url("../assets/icons/download-blue.svg");
  background-repeat: no-repeat;
  font-size: 12px;
  /* Adjust this size as needed */
  margin-left: 5px;
  /* Space between icon and text */
  height: 30px;
  width: 30px;
  border: none;
}

.btn-show-difference {
  background: url("../assets/icons/compare.svg");
  background-repeat: no-repeat;
  font-size: 12px;
  margin-left: 5px;
  height: 30px;
  widows: 30px;
  border: none;
  object-fit: cover;
}

.btn-delete {
  background: url("../assets/icons/delete-red2.svg");

  background-repeat: no-repeat;
  font-size: 12px;
  margin-left: 5px;
  height: 30px;
  width: 30px;
  border: none;
}

.btn-restore {
  background: url("../assets/icons/restorebtn1.svg");

  background-repeat: no-repeat;
  font-size: 12px;
  margin-left: 5px;
  height: 30px;
  width: 30px;
  border: none;
}

.btn-trash {
  background: url("../assets/icons/recycle-icon.svg");

  background-repeat: no-repeat;
  font-size: 12px;
  margin-left: 5px;
  height: 30px;
  width: 30px;
  border: none;
}

.btn-transform {
  background: url("../assets/icons/transform.svg");
  background-repeat: no-repeat;
  font-size: 12px;
  /* Adjust this size as needed */
  margin-left: 5px;
  /* Space between icon and text */
  height: 30px;
  widows: 30px;
  border: none;
}

.t .button-group {
  height: 35px;
  float: left;
  margin: 10px;
}

.dropdown-toggle {
  /* float: left; */
}

.xml-tranfomer-dropdown {
  background: #666;
  height: 100px;
  width: 300px;
  border: #ccc;
}

.xml-tranfomer-dropdown img {
  height: 30%;
  width: 40%;
}

.container {
  max-width: 95%;
  margin-top: 100px;
}

.file-upload {
  width: 20%;
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

.report {
  /* background: black; */
  /* border: 2px dashed #333;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
  /* transition: all 0.3s ease; */
  width: 80%;
  height: 70vh;
  float: left;
  /* background-color: #FFE8C8; */
}

.report-sub {
  margin-top: 5rem;
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
  height: 10vh;
  width: 90%;
  border: 2px dashed #333;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin-left: 5%;
}

.table-custom tbody tr:nth-of-type(odd) {
  background-color: #f2f2f2;
}

.table-custom tbody tr:nth-of-type(even) {
  background-color: #d9d9d9;
}

h1 {
  font-size: 3em;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 0.5em;
  margin-top: 1vh;
}

h4 {
  font-size: 1.2em;
  font-weight: normal;
  color: #666;
  text-align: center;
  margin-bottom: 1em;
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

nav {
  background-color: #cd7838;
  padding: 1em;
}

ul {
  list-style-type: none;
  padding: 0;
  overflow-y: scroll;
    height: 20.5rem;
}

li {
  /* display: inline; */
  /* margin-right: 1em; */
  margin-top: 1vh;
}

a {
  /* color: white; */
  text-decoration: none;
}

.sticky {
  position: sticky;
  right: 0;
  /* Set the left position */
  z-index: 0;
}

/* .sticky-action {
  position: sticky;
  right: 0;
  top: 0;
  z-index: 1;
} */

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

.sortbydd {
  /* margin-left: 1rem;
  padding: 0px 2px !important; */
}

.colUl,
.show {
  /* left: -24px !important; */
  /* inset: 3px 23px auto -26px !important; */

}

.srchip {
  /* padding: 0.375rem 4.75rem */
  width: 140px !important;
}

.divalignleft {
  margin-left: -4rem;
}

.srchalign {
  margin-left: 6rem
}

.clrdiv {
  margin-left: 3rem
}
</style>