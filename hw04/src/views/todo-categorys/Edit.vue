<template>
    <div>
        <h1>Edit</h1>

        <h4>Todo category ({{ id }})</h4>
        <hr />
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="control-label" for="CategoryName"
                        >Category name *</label
                    >
                    <input
                        v-model="categoryName"
                        class="form-control"
                        type="text"
                    />
                </div>
                <br />
                <div class="form-group">
                    <label class="control-label" for="CategorySort"
                        >Category sort *</label
                    >
                    <input
                        v-model="categorySort"
                        class="form-control"
                    />
                </div>
                <br />
                <div class="form-group">
                    <input
                        type="submit"
                        value="Save"
                        class="btn btn-success"
                        @click="saveChangesClicked()"
                    />
                </div>
            </div>
        </div>
        <br />
        <div>
            <router-link to="/todocategorys" class="link-secondary">Back to List</router-link>
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
export default class TodoCategoryEdit extends Vue {
    id!: string;
    todoCategory: ITodoCategory | null = null;
    categoryName: string | null = null;
    categorySort: number | null = null;

    async saveChangesClicked(): Promise<void> {
        const objToSave: ITodoCategory = {
            id: this.id,
            categoryName: this.categoryName!,
            categorySort: this.categorySort!
        };
        const service = new BaseService<ITodoCategory>(
            "https://taltech.akaver.com/api/v1/TodoCategories",
            store.state.token ? store.state.token : undefined
        );
        service.put(this.id, objToSave).then((statusCode) => {
            if (statusCode.statusCode >= 200 && statusCode.statusCode < 300) {
                this.$router.push("/todocategorys");
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
