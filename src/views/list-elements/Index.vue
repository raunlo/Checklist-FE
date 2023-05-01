<template>
    <div>
        <div>
            <br/>
            <div class="form-group">
                <router-link
                    :to="createTaskRoute"
                    class="btn btn-dark"
                    role="button"
                >Create new item
                </router-link
                >
            </div>
            <br/>
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
                        :class="filter === FilterType.TODO && 'active'"
                        @click="addFilterAndQueryTasks(FilterType.TODO)"
                    >
                        Uncompleted
                    </button
                    >&nbsp;
                    <button
                        class="btn btn-outline-dark btn-sm"
                        :class="filter === FilterType.COMPLETED && 'active'"
                        @click="addFilterAndQueryTasks(FilterType.COMPLETED)"
                    >
                        Completed
                    </button>
                </th>
                <th></th>
            </tr>
            </thead>
            <div v-if="!items">
                <br/>
                <div class="spinner-border text-secondary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <draggable v-model="items" tag="tbody" item-key="id" @change="changeOrder($event)" handle=".handle">
                <template #item="{ element }">
                    <tr v-bind:class="{completed: element.completed}">
                        <td>
                            <i class="fa fa-align-justify handle"></i>
                            <input
                                v-model="element.completed"
                                class="custom-checkbox"
                                type="checkbox"
                                @click="checkboxClicked(element)"
                            /> &nbsp;&nbsp;
                            <router-link
                                :to="getTaskRoute(element.id)"
                                class="link-dark"
                            >{{ element.name }}
                            </router-link
                            >
                        </td>
                        <td class="alignright">
                            <input
                                type="image"
                                src="https://img.favpng.com/13/25/7/computer-icons-png-favpng-LSJt9i7RPhEkvdNs4btbaNcj5.jpg"
                                class="icon"
                                @click="deleteClicked(element.id)"
                            />
                        </td>
                        <td></td>
                    </tr>
                </template>
            </draggable>
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
import draggable from 'vuedraggable'
import { FilterType } from "@/domain/filter-type";

@Options({
    components: { draggable },
})
export default class TasksIndex extends Vue {
    // import for vue
    FilterType = FilterType

    items: Task[] | null = null
    filter: FilterType = FilterType.NONE
    checklistId: number = Number(useRoute().params.checklistId)
    service: TaskService = inject(TaskServiceName) as TaskService
    createTaskRoute: any = getChecklistTaskDetailsRoute(this.checklistId)
    timer = setInterval(() => this.getAllTasks(), 6000)

    async checkboxClicked(item: Task): Promise<void> {
        const objToSave: Task = {
            ...item,
            completed: !item.completed,
        };

        this.service.update(this.checklistId, objToSave)
            .catch(() => {
                this.items = this.items?.map(task =>
                    ({
                        ...task,
                        completed: task.id === item.id ? !task.completed : task.completed
                    })
                ) ?? []
            })
    }

    async deleteClicked(id: number): Promise<void> {
        this.service.delete(this.checklistId, id).then(() => {
            this.items = this.items?.filter((item: Task) => item.id !== id) ?? []
        });
    }

    mounted(): void {
        this.getAllTasks()
    }

    getTaskRoute(taskId: number): RouteLocationRaw {
        return getChecklistTaskDetailsRoute(this.checklistId, taskId)
    }

    async getAllTasks(): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.service.getAll(this.checklistId, this.filter!)
            .then((result: FetchResponse<Task[]>) => {
                this.items = result.data ?? [];
            })
            .catch(() => {
                this.items = [];
            });
    }

    async addFilterAndQueryTasks(filter: FilterType): Promise<void> {
        console.log(filter)
        if (this.filter === filter) {
            this.filter = FilterType.NONE
        } else {
            this.filter = filter
        }
        await this.getAllTasks()
    }

    beforeUnmount(): void {
        clearInterval(this.timer)
    }

    async changeOrder(changeOrderEvent: any): Promise<void> {
        const taskId = changeOrderEvent.moved.element.id
        const newIndex = changeOrderEvent.moved.newIndex + 1
        await this.service.changeOrder({
            newOrderNumber: newIndex,
            checklistItemId: taskId,
            checklistId: this.checklistId
        })
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

.handle {
    padding-top: 8px;
    padding-bottom: 8px;
    margin-right: 1em;
}
</style>
