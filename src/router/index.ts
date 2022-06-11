import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import ListElementCreate from '../views/list-elements/Create.vue';
import ListElementEdit from '../views/list-elements/Edit.vue';
import ChecklistIndex from "@/views/checklist-elements/Index.vue";
import TasksIndex from "@/views/list-elements/Index.vue";

const routes: Array<RouteRecordRaw> = [
    { path: '/', name: 'checklist', component: ChecklistIndex, },
    { path: '/checklist/create', name: 'listelement-create', component: ListElementCreate, },
    { path: '/checklist/edit/:id', name: 'listelement-edit', component: ListElementEdit, props: true },
    { path: '/checklist/:id/tasks', name: 'checklist tasks', component: TasksIndex, props: true },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
