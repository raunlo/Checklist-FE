import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/identity/Login.vue';
import Register from '../views/identity/Register.vue';

import TodoCategorysIndex from '../views/todo-categorys/Index.vue';
import TodoCategoryDetails from '../views/todo-categorys/Details.vue';
import TodoCategoryCreate from '../views/todo-categorys/Create.vue';
import TodoCategoryEdit from '../views/todo-categorys/Edit.vue';
import TodoCategoryDelete from '../views/todo-categorys/Delete.vue';

import TodoPrioritiesIndex from '../views/todo-priorities/Index.vue';
import TodoPriorityDetails from '../views/todo-priorities/Details.vue';
import TodoPriorityCreate from '../views/todo-priorities/Create.vue';
import TodoPriorityEdit from '../views/todo-priorities/Edit.vue';
import TodoPriorityDelete from '../views/todo-priorities/Delete.vue';

import TodoTasksIndex from '../views/todo-tasks/Index.vue';
import TodoTaskDetails from '../views/todo-tasks/Details.vue';
import TodoTaskCreate from '../views/todo-tasks/Create.vue';
import TodoTaskEdit from '../views/todo-tasks/Edit.vue';
import TodoTaskDelete from '../views/todo-tasks/Delete.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/identity/login',
        name: 'identity-login',
        component: Login,
    },
    {
        path: '/identity/register',
        name: 'identity-register',
        component: Register,
    },
    { path: '/todocategorys', name: 'todocategorys-index', component: TodoCategorysIndex, },
    { path: '/todocategory/details/:id', name: 'todocategory-details', component: TodoCategoryDetails, props: true },
    { path: '/todocategory/create', name: 'todocategory-create', component: TodoCategoryCreate, },
    { path: '/todocategory/edit/:id', name: 'todocategory-edit', component: TodoCategoryEdit, props: true },
    { path: '/todocategory/delete/:id', name: 'todocategory-delete', component: TodoCategoryDelete, props: true },
    { path: '/todopriorities', name: 'todopriorities-index', component: TodoPrioritiesIndex, },
    { path: '/todopriority/details/:id', name: 'todopriority-details', component: TodoPriorityDetails, props: true },
    { path: '/todopriority/create', name: 'todopriority-create', component: TodoPriorityCreate, props: true },
    { path: '/todopriority/edit/:id', name: 'todopriority-edit', component: TodoPriorityEdit, props: true },
    { path: '/todopriority/delete/:id', name: 'todopriority-delete', component: TodoPriorityDelete, props: true },
    { path: '/todotasks', name: 'todotasks-index', component: TodoTasksIndex, },
    { path: '/todotask/details/:id', name: 'todotask-details', component: TodoTaskDetails, props: true },
    { path: '/todotask/create', name: 'todotask-create', component: TodoTaskCreate, props: true },
    { path: '/todotask/edit/:id', name: 'todotask-edit', component: TodoTaskEdit, props: true },
    { path: '/todotask/delete/:id', name: 'todotask-delete', component: TodoTaskDelete, props: true },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
