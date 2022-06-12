<template>
    <div class="row">
        <div className="col-sm-1 col-md-3"></div>
        <div className="col-sm-10 col-md-6">
            <h1>Create</h1>
            <h4>List item</h4>
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
                <router-link to="/" class="link-secondary"
                    >Back to List</router-link
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { NavigationFailure, useRoute } from "vue-router";
import { Task } from "@/domain/task";
import { TaskService } from "@/services/task-service";
import { inject } from "vue";
import { TaskServiceName } from "@/constants/service-constants";
import { getChecklistTasksRoute } from "@/router";

@Options({
    components: {},
    props: {},
})
export default class TaskCreate extends Vue {
    task: Task = {
        name: "",
        completed: false
    }

    checklistId: number | null = null;
    service : TaskService = inject(TaskServiceName) as TaskService;
    router = useRoute();

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
    }

    mounted (): void {
        this.checklistId = Number(this.router.params.checklistId)
        console.log(this.checklistId)
        const taskId = Number(this.router.params.taskId)
        if (taskId) {
            this.service.get(this.checklistId, taskId)
                .then(r => {
                    this.task = r.data as Task;
                })
        }
    }
}
</script>
