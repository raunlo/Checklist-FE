<template>
    <div>
        <div class="form-group">
            <router-link :to="'/todopriority/create/'" class="btn btn-dark"
                role="button"
                            >Create new priority</router-link
                        >
        </div>
        <br/>
        <h1>Todo Priorities</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>Priority Name</th>
                    <th>Priority Sort</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <div v-if="todoPriorities == null">
                    <br />
                    <div class="spinner-border text-secondary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <tr v-for="item in todoPriorities" :key="item.id">
                    <td>{{ item.priorityName }}</td>
                    <td>{{ item.prioritySort }}</td>
                    <td>
                        <router-link :to="'/todopriority/details/' + item.id" class="link-secondary"
                            >Details</router-link
                        >
                        |
                        <router-link :to="'/todopriority/edit/' + item.id" class="link-secondary"
                            >Edit</router-link
                        >
                        |
                        <router-link :to="'/todopriority/delete/' + item.id" class="link-secondary"
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
import { ITodoPriority } from "@/domain/ITodoPriority";

@Options({
    components: {},
    props: {},
})
export default class TodoPrioritiesIndex extends Vue {
    todoPriorities: ITodoPriority[] | null = null;

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
        const service = new BaseService<ITodoPriority>(
            "https://taltech.akaver.com/api/v1/TodoPriorities",
            store.state.token ? store.state.token : undefined
        );
        service.getAll().then((data) => {
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
