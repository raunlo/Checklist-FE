<template>
    <div>
        <h1 v-show="token == null">Hello!</h1>
        <h1 v-show="token != null">Welcome back, {{firstname}} {{lastname}}!</h1>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import store from "@/store/index";

export default class Home extends Vue {
    get token(): string | null {
        return store.state.token;
    }

    get firstname(): string {
        return store.state.firstname;
    }

      get lastname(): string {
        return store.state.lastname;
    }
}
</script>
