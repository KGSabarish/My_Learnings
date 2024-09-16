<template>
  <FileDifMenu />
  <div class="loader"></div>
  <div class="row">
    <!-- <div class="col-1">
      @onchange="setValuesToStore(responseBody.fileName)"
      <button class="btn" @click="this.$router.push('/')">
        <span><i class="fa fa-arrow-left fa-3x"></i></span>
      </button>
    </div> -->
    <!-- <div class="col" style="height: 40px">
      <h3 class="text-center">{{ responseBody.fileName }}</h3>
    </div> -->
    <!-- <span v-if="setValuesToStore(responseBody.fileName)"></span> -->
  </div>

  <div class="row">
    <div v-if="loading" class="process-loading">
      <div>
        <div class="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>


    <CodeDiff :old-string="responseBody.input_xsl" :new-string="responseBody.converted_xsl" output-format="side-by-side"
      style="height: 68vh" />
  </div>

  <!-- :filename="filename"
    :newFilename="'Converted_' + filename" -->
  <!-- </div> -->
</template>

<script>
// import { CodeDiff } from "v-code-diff";
import FileDifMenu from '../components/XmlandFileDifMenu.vue'
import axios from "axios";
import Store from "../vuex/store.js";
// import Store from "../vuex/store.js";
// import func from 'vue-editor-bridge';
export default {
  name: "FileDifferenceNew",
  // props: ["userId", "requestId"],
  data() {
    return {
      responseBody: "",
      loading: false,
    };
  },

  components: {
    FileDifMenu,
    // CodeDiff,
  },
  mounted() {
    this.showDifference();
  },
  computed: {
    userId() {
      return Store.getters.getUserId;
    },
    requestId() {
      return Store.getters.getRequestId;
    },
  },
  methods: {
    async showDifference() {
      this.loading = true;
      console.log(this.userId);

      const body = {
        userId:this.userId,
        requestId:this.requestId,
      };

      try {
        const response = await axios.post(process.env.VUE_APP_BASE_URL+"/dev/compare", body);

        if (response.status === 200) {
          this.responseBody = response.data;
          
        } else {
          console.log("Failure in File Comparision :", response.data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
      this.loading = false;
    },

    // setValuesToStore(convertedFileName) {
    //   console.log("ConvertedFileName", convertedFileName);
    //   Store.commit("setConvertedFileName", convertedFileName);
    // },
  },
  
};
</script>


<style scoped>
@import "~@fortawesome/fontawesome-free/css/all.min.css";

/* loading spinner Start */
.process-loading {
  /* background-color: aliceblue; */
  height: 68vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 3;
}

.lds-roller,
.lds-roller div,
.lds-roller div:after {
  box-sizing: border-box;
}

.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}

.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7.2px;
  height: 7.2px;
  border-radius: 50%;
  background: currentColor;
  margin: -3.6px 0 0 -3.6px;
}

.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}

.lds-roller div:nth-child(1):after {
  top: 62.62742px;
  left: 62.62742px;
}

.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}

.lds-roller div:nth-child(2):after {
  top: 67.71281px;
  left: 56px;
}

.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}

.lds-roller div:nth-child(3):after {
  top: 70.90963px;
  left: 48.28221px;
}

.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}

.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}

.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}

.lds-roller div:nth-child(5):after {
  top: 70.90963px;
  left: 31.71779px;
}

.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}

.lds-roller div:nth-child(6):after {
  top: 67.71281px;
  left: 24px;
}

.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}

.lds-roller div:nth-child(7):after {
  top: 62.62742px;
  left: 17.37258px;
}

.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}

.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12.28719px;
}

@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* loading spinner End */

.fa-3x {
  font-size: 1em;
}

h1 {
  padding-right: 10%;
}

button {
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

button:hover {
  -webkit-transform: translateX(-5px);
}
</style>