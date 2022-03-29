<template>
    <div>
        <div class="form-group">
            <router-link :to="'/todocategory/create/'" class="btn btn-dark"
                role="button"
                            >Create new category</router-link
                        >
        </div>
        <br/>
        <h1>Todo Categorys</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>Category Name</th>
                    <th>Category Sort</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <div v-if="todoCategorys == null">
                    <br />
                    <div class="spinner-border text-secondary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <tr v-for="item in todoCategorys" :key="item.id">
                    <td>{{ item.categoryName }}</td>
                    <td>{{ item.categorySort }}</td>
                    <td>
                        <router-link :to="'/todocategory/details/' + item.id" class="link-secondary"
                            >Details</router-link
                        >
                        |
                        <router-link :to="'/todocategory/edit/' + item.id" class="link-secondary"
                            >Edit</router-link
                        >
                        |
                        <router-link :to="'/todocategory/delete/' + item.id" class="link-secondary"
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
import { ITodoCategory } from "@/domain/ITodoCategory";

@Options({
    components: {},
    props: {},
})
export default class TodoCategorysIndex extends Vue {
    todoCategorys: ITodoCategory[] | null = null;

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
        const service = new BaseService<ITodoCategory>(
            "https://taltech.akaver.com/api/v1/TodoCategories",
            store.state.token ? store.state.token : undefined
        );
        service.getAll().then((data) => {
            this.todoCategorys = data.data!;
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
