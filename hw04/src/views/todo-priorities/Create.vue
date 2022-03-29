<template>
    <div>
        <h1>Create</h1>
        <h4>Todo priority</h4>
        <hr />
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="control-label" for="PriorityName"
                        >Priority name *</label
                    >
                    <input
                        v-model="priorityName"
                        class="form-control"
                        type="text"
                    />
                </div>
                <br />
                <div class="form-group">
                    <label class="control-label" for="PrioritySort"
                        >Priority sort *</label
                    >
                    <input v-model="prioritySort" class="form-control" />
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
            <router-link to="/todopriorities" class="link-secondary">Back to List</router-link>
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
    props: {},
})
export default class TodoPriorityCreate extends Vue {
    priorityName: string | null = null;
    prioritySort: number | null = null;

     async saveClicked(): Promise<void> {
        const objToSave: ITodoPriority = {
            priorityName: this.priorityName!,
            prioritySort: this.prioritySort!,
        };
        const service = new BaseService<ITodoPriority>(
            "https://taltech.akaver.com/api/v1/TodoPriorities",
            store.state.token ? store.state.token : undefined
        );
        service.post(objToSave).then((statusCode) => {
            if (statusCode.statusCode >= 200 && statusCode.statusCode < 300) {
                this.$router.push("/todopriorities");
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
