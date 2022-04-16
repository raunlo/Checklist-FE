<template>
    <div class="row">
        <div className="col-sm-1 col-md-3"></div>
        <div className="col-sm-10 col-md-6">
            <h1>Edit</h1>
            <h4>List item</h4>
            <hr />
            <div v-if="description == null">
                <br />
                <div class="spinner-border text-secondary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div v-else>
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
                    <input
                        type="checkbox"
                        class="form-check-input"
                        v-model="completed"
                    />
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
import store from "@/store/index";
import { BaseService } from "@/services/base-service";
import { IListItem } from "@/domain/IListItem";

@Options({
    components: {},
    props: {
        id: String,
    },
})
export default class ListItemCreate extends Vue {
    description: string | null = null;
    completed: boolean = false;
    id!: string;

    get apiKey(): string {
        return store.state.apiKey;
    }

    async saveClicked(): Promise<void> {
        const objToSave: IListItem = {
            id: this.id!,
            description: this.description!,
            completed: this.completed,
        };
        const service = new BaseService<IListItem>(
            "https://taltech.akaver.com/api/v1/ListItems",
            "?apiKey=" + this.apiKey
        );
        service.put(this.id, objToSave).then((statusCode) => {
            if (statusCode.statusCode >= 200 && statusCode.statusCode < 300) {
                this.$router.push("/");
            } else {
                alert("Wrong input!");
            }
        });
    }

    mounted(): void {
        const service = new BaseService<IListItem>(
            "https://taltech.akaver.com/api/v1/ListItems",
            "?apiKey=" + this.apiKey
        );
        service.get(this.id).then((data) => {
            this.description = data.data!.description;
            this.completed = data.data!.completed;
        });
    }
}
</script>
