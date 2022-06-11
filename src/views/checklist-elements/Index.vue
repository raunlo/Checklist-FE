<template>
    <div>
        <div>
            <br />
            <div class="form-group">
                <router-link
                    :to="'/listelement/create'"
                    class="btn btn-dark"
                    role="button"
                    >Create new item</router-link
                >
            </div>
            <br />
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>
                        <h6><b>Shopping List</b></h6>
                    </th>
                    <th class="alignright">
                        <button
                            class="btn btn-outline-dark btn-sm"
                            @click="filterButtonClicked('')"
                        >
                            All</button
                        >&nbsp;
                        <button
                            class="btn btn-outline-dark btn-sm"
                            @click="filterButtonClicked('&completed=false')"
                        >
                            Uncompleted</button
                        >&nbsp;
                        <button
                            class="btn btn-outline-dark btn-sm"
                            @click="filterButtonClicked('&completed=true')"
                        >
                            Completed
                        </button>
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <div v-if="listitems == null">
                    <br />
                    <div class="spinner-border text-secondary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <tr v-for="(item, index) in listitems" :key="index">
                    <td>
                        <input
                            v-model="item.completed"
                            class="custom-checkbox"
                            type="checkbox"
                            @click="checkboxClicked(item)"
                        /> &nbsp;&nbsp;
                        <router-link
                            :to="'/listelement/edit/' + item.id"
                            class="link-dark"
                            >{{ item.description }}</router-link
                        >
                    </td>
                    <td class="alignright">
                        <input
                            type="image"
                            src="https://img.favpng.com/13/25/7/computer-icons-png-favpng-LSJt9i7RPhEkvdNs4btbaNcj5.jpg"
                            class="icon"
                            @click="deleteClicked(item.id)"
                        />
                    </td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Task } from "@/domain/task";

@Options({
    components: {},
    props: {},
})
export default class ChecklistIndex extends Vue {
    listitems: Task[] | null = null;

    // get apiKey(): string {
    //     return store.state.apiKey;
    // }

    // async checkboxClicked(item: Task): Promise<void> {
    //     const objToSave: Task = {
    //         id: item.id!,
    //         description: item.description!,
    //         completed: !item.completed,
    //     };
    //     const service = new BaseService<Task>(
    //         "https://taltech.akaver.com/api/v1/ListItems",
    //         "?apiKey=" + this.apiKey
    //     );
    //     service.put(item.id!, objToSave).then((statusCode) => {
    //         if (statusCode.statusCode >= 200 && statusCode.statusCode < 300) {
    //             this.$router.push("/");
    //         }
    //     });
    // }
    //
    // async deleteClicked(id: string): Promise<void> {
    //     const service = new BaseService<Task>(
    //         "https://taltech.akaver.com/api/v1/ListItems",
    //         "?apiKey=" + this.apiKey
    //     );
    //     service.delete(id).then(() => {
    //         window.location.reload();
    //     });
    // }
    //
    // async filterButtonClicked(queryParam: string): Promise<void> {
    //     const service = new BaseService<Task>(
    //         "https://taltech.akaver.com/api/v1/ListItems",
    //         "?apiKey=" + this.apiKey + queryParam
    //     );
    //     service.getAll().then((data) => {
    //         this.listitems = data.data!;
    //     });
    // }
    //
    // mounted(): void {
    //     const service = new BaseService<Task>(
    //         "https://taltech.akaver.com/api/v1/ListItems",
    //         "?apiKey=" + this.apiKey
    //     );
    //     service.getAll().then((data) => {
    //         this.listitems = data.data!;
    //     });
    // }
}
</script>

<style scoped>
.icon {
    width: 1.5em;
    height: 1.5em;
}

.alignright {
    text-align: right;
}
</style>
