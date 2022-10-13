<template>
    <div class="flex justify-center items-center p-2">
        <h1 class="text-purple-400">COUNTRY INFORMATION</h1>
        <div class="flex m-4">
            <ion-icon
                name="contrast-outline"
                class="ion-icon"
                @click="changeMode()"
            ></ion-icon>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const changeMode = ref(() => {
    store.state.lightMode = !store.state.lightMode;
});
</script>

<style scoped lang="scss">
.ion-icon {
    font-size: 3rem;
    color: white;
    &:hover {
        cursor: pointer;
        transform: scale(1.2);
        transition: all 0.3s ease-in-out;
    }
    &:active {
        transform: rotate(180deg);
        color: black;
    }
    
}
</style>
