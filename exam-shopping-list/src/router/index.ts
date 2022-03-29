import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import ListElementsIndex from '../views/list-elements/Index.vue';
import ListElementCreate from '../views/list-elements/Create.vue';
import ListElementEdit from '../views/list-elements/Edit.vue';

const routes: Array<RouteRecordRaw> = [
    { path: '/', name: 'listelements-index', component: ListElementsIndex, },
    { path: '/listelement/create', name: 'listelement-create', component: ListElementCreate, },
    { path: '/listelement/edit/:id', name: 'listelement-edit', component: ListElementEdit, props: true },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
