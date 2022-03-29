<template>
    <div>
        <h1>Create</h1>
        <h4>Todo task</h4>
        <hr />
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="control-label" for="TaskName"
                        >Task name *</label
                    >
                    <input
                        v-model="taskName"
                        class="form-control"
                        type="text"
                    />
                </div>
                <br />
                <div class="form-group">
                    <label class="control-label" for="TaskSort"
                        >Task sort *</label
                    >
                    <input v-model="taskSort" class="form-control" />
                </div>
                <br />
                <div class="form-group">
                    <label class="control-label" for="TaskCategory"
                        >Task category *</label
                    >
                    <select class="form-select" v-model="taskCategoryId">
                        <option  v-for="category in todoCategorys" v-bind:key="category" v-bind:value="category.id">{{ category.categoryName }}</option>
                    </select>
                </div>
                <br />
                <div class="form-group">
                    <label class="control-label" for="TaskPriority"
                        >Task priority *</label
                    >
                    <select class="form-select" v-model="taskPriorityId">
                        <option  v-for="priority in todoPriorities" v-bind:key="priority" v-bind:value="priority.id">{{ priority.priorityName }}</option>
                    </select>
                </div>
                <br />
                <div class="form-group">
                    <input
                        type="submit"
                        value="Save"
                        class="btn btn-success"
                        @click="saveClicked()"
                    />
                </div>
            </div>
        </div>
        <br />
        <div>
            <router-link to="/todotasks" class="link-secondary"
                >Back to List</router-link
            >
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { BaseService } from "@/services/base-service";
import { ITodoTask } from "@/domain/ITodoTask";
import { ITodoCategory } from "@/domain/ITodoCategory";
import { ITodoPriority } from "@/domain/ITodoPriority";

@Options({
    components: {},
    props: {},
})
export default class TodoTaskCreate extends Vue {
    taskName: string | null = null;
    taskSort: number | null = null;
    taskCategoryId: string | null = null;
    taskPriorityId: string | null = null;
    todoCategorys: ITodoCategory[] | null = null;
    todoPriorities: ITodoPriority[] | null = null;

    async saveClicked(): Promise<void> {
        const objToSave: ITodoTask = {
            taskName: this.taskName!,
            taskSort: this.taskSort!,
            todoCategoryId: this.taskCategoryId!,
            todoPriorityId: this.taskPriorityId!,
        };
        const service = new BaseService<ITodoTask>(
            "https://taltech.akaver.com/api/v1/TodoTasks",
            store.state.token ? store.state.token : undefined
        );
        service.post(objToSave).then((statusCode) => {
            if (statusCode.statusCode >= 200 && statusCode.statusCode < 300) {
                this.$router.push("/todotasks");
            } else {
                alert("Wrong input!");
            }
        });
    }

    beforeCreate(): void {
        console.log("beforeCreate");
    }

    created(): void {
        console.log("created");
    }

    beforeMount(): void {
        console.log("beforeMount");
    }

    mounted(): void {
        console.log("mounted");
        const service1 = new BaseService<ITodoCategory>(
            "https://taltech.akaver.com/api/v1/TodoCategories",
            store.state.token ? store.state.token : undefined
        );
        service1.getAll().then((data) => {
            this.todoCategorys = data.data!;
        });

        const service2 = new BaseService<ITodoPriority>(
            "https://taltech.akaver.com/api/v1/TodoPriorities",
            store.state.token ? store.state.token : undefined
        );
        service2.getAll().then((data) => {
            this.todoPriorities = data.data!;
        });
    }

    beforeUpdate(): void {
        console.log("beforeUpdate");
    }

    updated(): void {
        console.log("updated");
    }

    activated(): void {
        console.log("activated");
    }

    deactivated(): void {
        console.log("deactivated");
    }

    beforeUnmount(): void {
        console.log("beforeUnmount");
    }

    unmounted(): void {
        console.log("unmounted");
    }
}
</script>
