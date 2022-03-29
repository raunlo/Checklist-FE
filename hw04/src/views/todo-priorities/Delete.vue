<template>
    <div>
        <h1>Delete this todo priority?</h1>

        <div>
            <h4>Details</h4>
            <hr />
            <dl class="row">
                <dt class="col-sm-4">Id</dt>
                <dd class="col-sm-8">{{ id }}</dd>
                <dt class="col-sm-4">Priority Name</dt>
                <dd class="col-sm-8">{{ priorityName }}</dd>
                <dt class="col-sm-4">Priority Sort</dt>
                <dd class="col-sm-8">{{ prioritySort }}</dd>
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
            <router-link to="/todopriorities" class="link-secondary">No, back to List</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { BaseService } from "@/services/base-service";
import { ITodoPriority } from "@/domain/ITodoPriority";

@Options({
    components: {},
    props: {
        id: String,
    },
})
export default class TodoPriorityDelete extends Vue {
    id!: string;
    todoPriority: ITodoPriority | null = null;
    priorityName: string | null = null;
    prioritySort: number | null = null;

    async deleteClicked(): Promise<void> {
        const service = new BaseService<ITodoPriority>(
            "https://taltech.akaver.com/api/v1/TodoPriorities",
            store.state.token ? store.state.token : undefined
        );
        service.delete(this.id).then(() => {
            this.$router.push("/todopriorities");
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
        const service = new BaseService<ITodoPriority>(
            "https://taltech.akaver.com/api/v1/TodoPriorities",
            store.state.token ? store.state.token : undefined
        );
        service.get(this.id).then((data) => {
            this.todoPriority = data.data!;
            this.priorityName = this.todoPriority.priorityName;
            this.prioritySort = this.todoPriority.prioritySort;
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
