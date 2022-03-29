<template>
    <div>
        <h1>Delete this todo category?</h1>

        <div>
            <h4>Details</h4>
            <hr />
            <dl class="row">
                <dt class="col-sm-4">Id</dt>
                <dd class="col-sm-8">{{ id }}</dd>
                <dt class="col-sm-4">Category Name</dt>
                <dd class="col-sm-8">{{ categoryName }}</dd>
                <dt class="col-sm-4">Category Sort</dt>
                <dd class="col-sm-8">{{ categorySort }}</dd>
            </dl>
        </div>

        <br>
        <div class="form-group">
            <button
                @click="deleteClicked()"
                class="btn btn-danger"
                type="submit"
            >
                Yes, delete
            </button>
        </div>
        <br>
        <div>
            <router-link to="/todocategorys" class="link-secondary">No, back to List</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { BaseService } from "@/services/base-service";
import { ITodoCategory } from "@/domain/ITodoCategory";

@Options({
    components: {},
    props: {
        id: String,
    },
})
export default class TodoCategoryDelete extends Vue {
    id!: string;
    todoCategory: ITodoCategory | null = null;
    categoryName: string | null = null;
    categorySort: number | null = null;

    async deleteClicked(): Promise<void> {
        const service = new BaseService<ITodoCategory>(
            "https://taltech.akaver.com/api/v1/TodoCategories",
            store.state.token ? store.state.token : undefined
        );
        service.delete(this.id).then(() => {
            this.$router.push("/todocategorys");
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
        const service = new BaseService<ITodoCategory>(
            "https://taltech.akaver.com/api/v1/TodoCategories",
            store.state.token ? store.state.token : undefined
        );
        service.get(this.id).then((data) => {
            this.todoCategory = data.data!;
            this.categoryName = this.todoCategory.categoryName;
            this.categorySort = this.todoCategory.categorySort;
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
