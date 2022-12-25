<template>
    <div class="row">
        <div className="col-sm-1 col-md-3"></div>
        <div className="col-sm-10 col-md-6">
            <h1>Create</h1>
            <h4>List item</h4>
            <span style="color:red"> {{error}}</span>
            <hr />
            <div class="form-group">
                <label class="control-label" for="description"
                    >Description *</label
                >
                <input
                    id="description"
                    v-model="task.name"
                    class="form-control"
                    type="text"
                />
            </div>
            <br />
            <div class="form-group">
                <label class="control-label" for="completed"
                    >Completed *</label
                >&nbsp;
                <input type="checkbox" class="form-check-input" v-model="task.completed" />
            </div>
            <br />
            <div class="form-group">
                <input
                    id="completed"
                    type="submit"
                    value="Save"
                    class="btn btn-dark"
                    @click="saveClicked()"
                />
            </div>
            <br />
            <div>
                <router-link :to="checklistTasksRoute" class="link-secondary"
                    >Back to List</router-link
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { NavigationFailure, useRoute } from "vue-router";
import { Task } from "@/domain/task";
import { TaskService } from "@/services/task-service";
import { inject } from "vue";
import { TaskServiceName } from "@/constants/service-constants";
import { getChecklistTasksRoute } from "@/router";
import { ApiError } from "@/domain/api-error";

export default class TaskCreate extends Vue {
    task: Task = {
        name: "",
        completed: false
    }

    error: string = ""

    taskId : number = 0;

    service : TaskService = inject(TaskServiceName) as TaskService;
    router = useRoute();
    checklistId: number = Number(this.router.params.checklistId)
    checklistTasksRoute = getChecklistTasksRoute(this.checklistId)

    async saveClicked(): Promise<void| NavigationFailure> {
        let taskPromise;
        if (this.task.id) {
            taskPromise = this.service.update(this.checklistId!, this.task)
        } else {
            taskPromise = this.service.post(this.checklistId!, this.task);
        }
        return taskPromise.then(() => {
            this.$router.push(getChecklistTasksRoute(this.checklistId!))
        })
            .catch((apiError: ApiError) => {
                this.error = apiError.error.reason
            })
    }

    mounted(): void {
        this.getTask()
    }

    created (): void {
        this.taskId = Number(this.router.params.taskId)
    }

    async getTask(): Promise<void> {
        if (this.taskId) {
            return this.service.get(this.checklistId, this.taskId)
                .then(r => {
                    this.task = r.data as Task;
                })
        }
    }
}
</script>
