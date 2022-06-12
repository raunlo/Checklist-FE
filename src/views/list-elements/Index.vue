<template>
    <div>
        <div>
            <br />
            <div class="form-group">
                <router-link
                    :to="createTaskRoute"
                    class="btn btn-dark"
                    role="button"
                    >Create new item</router-link
                >
            </div>
            <br />
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>
                        <h6><b>Tasks</b></h6>
                    </th>
                    <th class="alignright">
                        <button
                            class="btn btn-outline-dark btn-sm"
                            @click="filterButtonClicked('')"
                        >
                            All</button
                        >&nbsp;
                        <button
                            class="btn btn-outline-dark btn-sm"
                            @click="filterButtonClicked('&completed=false')"
                        >
                            Uncompleted</button
                        >&nbsp;
                        <button
                            class="btn btn-outline-dark btn-sm"
                            @click="filterButtonClicked('&completed=true')"
                        >
                            Completed
                        </button>
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <div v-if="items == null">
                    <br />
                    <div class="spinner-border text-secondary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <tr v-for="(item, index) in items" :key="index" v-bind:class="{completed: item.completed}">
                    <td>
                        <input
                            v-model="item.completed"
                            class="custom-checkbox"
                            type="checkbox"
                            @click="checkboxClicked(item)"
                        /> &nbsp;&nbsp;
                        <router-link
                            :to="getTaskRoute(item.id)"
                            class="link-dark"
                            >{{ item.name }}</router-link
                        >
                    </td>
                    <td class="alignright">
                        <input
                            type="image"
                            src="https://img.favpng.com/13/25/7/computer-icons-png-favpng-LSJt9i7RPhEkvdNs4btbaNcj5.jpg"
                            class="icon"
                            @click="deleteClicked(item.id)"
                        />
                    </td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Task } from "@/domain/task";
import { TaskService } from "@/services/task-service";
import { TaskServiceName } from "@/constants/service-constants";
import { inject } from "vue";
import { FetchResponse } from "@/types/FetchResponse";
import { RouteLocationRaw, useRoute } from "vue-router";
import { getChecklistTaskDetailsRoute } from "@/router";

@Options({
    components: {},
    props: {},
})
export default class TasksIndex extends Vue {
    items: Task[] | null = null
    checklistId: number = Number(useRoute().params.checklistId)
    service: TaskService = inject(TaskServiceName) as TaskService
    createTaskRoute: any = getChecklistTaskDetailsRoute(this.checklistId)

    async checkboxClicked(item: Task): Promise<void> {
        const objToSave: Task = {
            ...item,
            completed: !item.completed
        };

        await this.service.update(this.checklistId, objToSave)
    }

    async deleteClicked(id: number): Promise<void> {
        this.service.delete(this.checklistId, id).then(() => {
            this.items = this.items?.filter((item: Task) => item.id !== id) ?? []
        });
    }

    // async filterButtonClicked(queryParam: string): Promise<void> {}

    mounted(): void {
        this.getAllTasks()
    }

    getTaskRoute(taskId: number): RouteLocationRaw { return getChecklistTaskDetailsRoute(this.checklistId, taskId) }

    async getAllTasks(): Promise<void> {
        this.service.getAll(this.checklistId)
            .then((result: FetchResponse<Task[]>) => {
                this.items = result.data!;
            })
            .catch(_ => { this.items = []; });
    }
}
</script>

<style scoped>
.icon {
    width: 1.5em;
    height: 1.5em;
}

.alignright {
    text-align: right;
}

.completed {
    text-decoration: line-through;
}
</style>
