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
                    v-model="description"
                    class="form-control"
                    type="text"
                />
            </div>
            <br />
            <div class="form-group">
                <label class="control-label" for="completed"
                    >Completed *</label
                >&nbsp;
                <input type="checkbox" class="form-check-input" v-model="completed" />
            </div>
            <br />
            <div class="form-group">
                <input
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
import { Task } from "@/domain/task";
import { ChecklistServiceName, TaskServiceName } from "@/constants/service-constants";
import { ChecklistService } from "@/services/checklist-service";
import { inject } from "vue";
import { TaskService } from "@/services/task-service";

@Options({
    components: {},
    props: {}
})
export default class ListItemCreate extends Vue {
    description: string | null = null;
    completed: boolean = false;

    setup() {
        return {
            Store: inject(TaskServiceName) as TaskService,
        }
    }

    async saveClicked(): Promise<void> {
        const objToSave: Task = {
            description: this.description!,
            completed: this.completed,
        };
        this.Store.post(objToSave).then((statusCode) => {
            if (statusCode.statusCode >= 200 && statusCode.statusCode < 300) {
                this.$router.push("/");
            } else {
                alert("Wrong input!");
            }
        });
    }
}
</script>
