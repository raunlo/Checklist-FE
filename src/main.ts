import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import VueAxios from 'vue-axios';

import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { ChecklistService } from "@/services/checklist-service";
import { ChecklistServiceName, TaskServiceName } from "@/constants/service-constants";
import { TaskService } from "@/services/task-service";

const basePath = process.env.VUE_APP_BASE_PATH
createApp(App)
    .use(store)
    .use(router)
    .use(VueAxios, axios)
    .provide(ChecklistServiceName, new ChecklistService(basePath))
    .provide(TaskServiceName, new TaskService(basePath))
    .mount('#app')
