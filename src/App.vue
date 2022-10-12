<template>
    <!-- <nav class="navbar">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
    </nav> -->
    <router-view />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const route = useRoute();
const router = useRouter();

watch(
    () => store.state.lightMode,
    (lightMode) => {
        if (lightMode) {
            document.body.classList.add("light");
        } else {
            document.body.classList.remove("light");
        }
        localStorage.setItem("lightMode", lightMode);
    }
);
onMounted(() => {
    const lightMode = localStorage.getItem("lightMode");
    if (lightMode == "true") {
        store.state.lightMode = true;
    } else {
        store.state.lightMode = false;
    }
});
</script>

<style lang="scss">
.light {
    background-color: #f0d0d0;
    color: black;
}

$background-color-dark: #1f2937;
$background-color-white: #f0d0d0;
#app {
    font-family: Fredoka One, cursive;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background-size: contain, cover;
    width: 100%;
    min-height: 100vh;
}
body {
    color: #7db7f1;
    background-color: $background-color-dark;
}
.navbar {
    padding: 30px;

    a {
        margin: 20px;
        font-weight: bold;
        color: #2c3e50;
        &:hover {
            color: #42b983;
            border-bottom: 2px solid brown;
        }

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
