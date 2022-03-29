<template>
    <div>
        <div class="form-group">
            <router-link :to="'/todotask/create/'" class="btn btn-dark"
                role="button"
                            >Create new task</router-link
                        >
        </div>
        <br/>
        <h1>Todo Tasks</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>Task Name</th>
                    <th>Task Sort</th>
                    <th>Task Category</th>
                    <th>Task Priority</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <div v-if="todoTasks == null">
                    <br />
                    <div class="spinner-border text-secondary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <tr v-for="item in todoTasks" :key="item.id">
                    <td>{{ item.taskName }}</td>
                    <td>{{ item.taskSort }}</td>
                    <td>{{ item.todoCategoryName }}</td>
                    <td>{{ item.todoPriorityName }}</td>
                    <td>
                        <router-link :to="'/todotask/details/' + item.id" class="link-secondary"
                            >Details</router-link
                        >
                        |
                        <router-link :to="'/todotask/edit/' + item.id" class="link-secondary"
                            >Edit</router-link
                        >
                        |
                        <router-link :to="'/todotask/delete/' + item.id" class="link-secondary"
                            >Delete</router-link
                        >
                    </td>
                </tr>
            </tbody>
        </table>
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
export default class TodoTasksIndex extends Vue {
    todoTasks: ITodoTask[] | null = null;

    get isUserLoggedIn(): boolean {
        return store.state.token != null;
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
        const service = new BaseService<ITodoTask>(
            "https://taltech.akaver.com/api/v1/TodoTasks",
            store.state.token ? store.state.token : undefined
        );
        service.getAll().then((data) => {
            this.todoTasks = data.data!;

            this.todoTasks.forEach(task => {
                const service1 = new BaseService<ITodoCategory>(
                    "https://taltech.akaver.com/api/v1/TodoCategories",
                    store.state.token ? store.state.token : undefined
                );
                service1.get(task.todoCategoryId).then((data) => {
                    const todoCategory = data.data;
                    task.todoCategoryName = todoCategory!.categoryName;
                });

                const service2 = new BaseService<ITodoPriority>(
                    "https://taltech.akaver.com/api/v1/TodoPriorities",
                    store.state.token ? store.state.token : undefined
                );
                service2.get(task.todoPriorityId).then((data) => {
                    const todoPriority = data.data;
                    task.todoPriorityName = todoPriority!.priorityName;
                });
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
