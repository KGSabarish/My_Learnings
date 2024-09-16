<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-2">
                <button class="btn" @click="this.$router.go(-1)">
                    <span><i class="fa fa-arrow-left fa-3x"></i></span>
                </button>
            </div>
            <div class="col-7">
                <h1 class="text-center">{{ this.convertedFileName }}</h1>
            </div>
            <div class="col">
                <ul class="nav nav-tabs nav-pills d-flex flex-row-reverse">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/xml-transformer" @change="checkFiledatas()">XML
                            Transformer</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/compare">Compare </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script>
import Store from '../vuex/store'
export default {

    name: 'XmlandFileDifMenu',
    computed: {

    convertedFileName: function () {
      return Store.getters.getConvertedFileName;
    },

  },
    data() {
        return {
            responseBody: "",
            loading: false,
        };
    },
    methods: {

        display(){
            console.log("After store file Name:" , this.convertedFileName);
        },

        isActiveTab(tabName) {
            return this.$route.name === tabName;
        },

    }
};
</script>

<style scoped>
.nav-link,
.nav-link:hover {
    color: #da6a2a
}

.nav-tabs{
    --bs-nav-tabs-border-width: none !important;
}

.nav-tabs .router-link-active {
    background-color: #1D2856 !important;
    border-bottom-color: transparent;
    color: white !important;
    font-size: 1.1rem !important;
    font-weight: bolder !important;
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

.fa-3x {
    font-size: 1.5rem;
}
</style>