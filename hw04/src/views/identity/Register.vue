<template>
    <div class="row">
        <div class="col-sm-1 col-md-3"></div>
        <div class="col-sm-10 col-md-6">
            <h4>Create a new account</h4>
            <hr />
            <div class="form-group">
                <label for="Input_Email">Email</label>
                <input
                    class="form-control"
                    type="email"
                    id="Input_Email"
                    v-model="email"
                />
                <br>
            </div>
            <div class="form-group">
                <label for="Input_Password">Password</label>
                <input
                    class="form-control"
                    type="password"
                    id="Input_Password"
                    v-model="password"
                />
                 <br>
            </div>
            <div class="form-group">
                <label for="Input_Firstname">Firstname</label>
                <input
                    class="form-control"
                    type="firstname"
                    id="Input_Firstname"
                    v-model="firstname"
                />
                <br>
            </div>
            <div class="form-group">
                <label for="Input_Lastname">Lastname</label>
                <input
                    class="form-control"
                    type="lastname"
                    id="Input_Lastname"
                    v-model="lastname"
                />
                <br>
            </div>
            <div class="form-group">
                <button
                    @click="registerClicked($event)"
                    type="submit"
                    class="btn btn-dark"
                >
                    Register
                </button>
            </div>
        </div>
        <div class="col-sm-1 col-md-3"></div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import router from "vue-router";

@Options({
    components: {},
    props: {},
})
export default class Register extends Vue {
    email: string = "elmar";
    password: string = "Elmar123..";
    firstname: string = "el";
    lastname: string = "mar";

    async registerClicked(event: Event): Promise<void> {
        store
            .dispatch("register", { email: this.email, password: this.password, firstname: this.firstname, lastname: this.lastname })
            .then(() => {
                if (store.state.token != null) {
                    this.$router.push("/");
                }
            });
    }
}
</script>
