import {
    createRouter,
    createWebHistory,
    LocationAsRelativeRaw,
    RouteLocationRaw,
    RouteParamsRaw,
    RouteRecordRaw
} from 'vue-router'

import ChecklistIndex from "@/views/checklist-elements/Index.vue";
import TasksIndex from "@/views/list-elements/Index.vue";
import TaskCreate from "@/views/list-elements/Create.vue";
const checklistTaskDetailsRouteName = 'checklist task details'
const checklistTasksRouteName = 'checklist tasks'
const checklistsRouteName = "checklists"
const routes: Array<RouteRecordRaw> = [
    { path: '/', name: checklistsRouteName, component: ChecklistIndex, },
    { path: '/checklist/:checklistId', name: checklistTasksRouteName, component: TasksIndex, props: true },
    { path: '/checklist/:checklistId/task/:taskId?', name: checklistTaskDetailsRouteName, component: TaskCreate, props: true },

]

export const getChecklistTaskDetailsRoute = (checklistId: number, taskId?: number): RouteLocationRaw => {
    let routeParams: RouteParamsRaw = { checklistId };
    if (taskId) {
        routeParams = {
            ...routeParams,
            taskId
        }
    }

    return {
        name: checklistTaskDetailsRouteName,
        params: routeParams
    }
}

export const getChecklistTasksRoute = (checklistId: number): RouteLocationRaw => {
    return {
        name: checklistTasksRouteName,
        params: {
            checklistId,
        }
    }
}

export const getChecklistsRoute = () => {
    return {
        name: checklistsRouteName
    }
}

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
