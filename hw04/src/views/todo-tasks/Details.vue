<template>
    <div>
        <h1>Details</h1>

        <div>
            <h4>Todo task</h4>
            <hr />
            <dl class="row">
                <dt class="col-sm-4">Id</dt>
                <dd class="col-sm-8">{{ id }}</dd>
                <dt class="col-sm-4">Task Name</dt>
                <dd class="col-sm-8">{{ taskName }}</dd>
                <dt class="col-sm-4">Task Sort</dt>
                <dd class="col-sm-8">{{ taskSort }}</dd>
                <dt class="col-sm-4">Task Category</dt>
                <dd class="col-sm-8">{{ todoCategoryName }}</dd>
                <dt class="col-sm-4">Task Priority</dt>
                <dd class="col-sm-8">{{ todoPriorityName }}</dd>
            </dl>
        </div>

        <div>
            <router-link to="/todotasks" class="link-secondary">Back to List</router-link>
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
    props: {
        id: String,
    },
})
export default class TodoTaskDetails extends Vue {
    id!: string;
    todoTask: ITodoTask | null = null;
    taskName: string | null = null;
    taskSort: number | null = null;
    todoCategoryName: string | null = null;
    todoPriorityName: string | null = null;

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
        const service = new BaseService<ITodoTask>(
            "https://taltech.akaver.com/api/v1/TodoTasks",
            store.state.token ? store.state.token : undefined
        );
        service.get(this.id).then((data) => {
            this.todoTask = data.data!;
            this.taskName = this.todoTask.taskName!;
            this.taskSort = this.todoTask.taskSort!;

            const service1 = new BaseService<ITodoCategory>(
                "https://taltech.akaver.com/api/v1/TodoCategories",
                store.state.token ? store.state.token : undefined
            );
            service1.get(this.todoTask.todoCategoryId).then((data) => {
                const todoCategory = data.data;
                this.todoTask!.todoCategoryName = todoCategory!.categoryName;
                this.todoCategoryName = todoCategory!.categoryName;
            });

            const service2 = new BaseService<ITodoPriority>(
                "https://taltech.akaver.com/api/v1/TodoPriorities",
                store.state.token ? store.state.token : undefined
            );
            service2.get(this.todoTask.todoPriorityId).then((data) => {
                const todoPriority = data.data;
                this.todoTask!.todoPriorityName = todoPriority!.priorityName;
                this.todoPriorityName = todoPriority!.priorityName;
            });
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
