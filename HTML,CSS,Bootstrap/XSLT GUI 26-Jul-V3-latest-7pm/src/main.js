import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ToastService from 'primevue/toastservice';
import CodeDiff from 'v-code-diff'

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap"

const app = createApp(App);
app.use(CodeDiff)
app.use(router);
app.use(ToastService);

app.config.globalProperties.$statuses = [
    {
        name :"ok",
        label:"Success" 
    }, 
    { 
        name : "in-prog",
        label : "In Progress" 
    }, 
    { 
        name:"fail",
        label:"Failed" 
    }, 
    {
        name:"new",
        label:"New" 
    }
]


    ;
app.mount('#app');


//createApp(App).use(router).mount('#app')
