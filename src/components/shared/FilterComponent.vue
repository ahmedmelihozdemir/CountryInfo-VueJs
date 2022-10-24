<template>
    <div
        class="grid xl:grid-cols-1 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1"
    >
        <div class="flex justify-around items-center">
            <label for="search" class="rounded-lg">
                <input
                    id="search"
                    type="text"
                    name="search"
                    placeholder="Search country!"
                    v-model="search"
                    class="input-section text-white border-red-400 rounded-lg p-2 m-2 bg-cyan-800 focus:border-none focus:outline-none"
                    :class="{
                        'bg-slate-300': lightMode,
                        'text-gray-900': lightMode,
                    }"
                />
            </label>
            <select
                name="continent"
                id="continent"
                v-model="filterContinent"
                class="select-section bg-cyan-800 rounded-lg focus:border-none focus:outline-none p-2 mx-6"
                :class="{
                    'bg-slate-300': lightMode,
                }"
            >
                <option value="All" selected>All</option>
                <option
                    v-for="(continent, idx) in continents"
                    :key="idx"
                    class="border-2 border-red-400"
                >
                    {{ continent.name }}
                </option>
            </select>
        </div>
        <br />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineEmits, watchEffect } from "vue";
import { useStore } from "vuex";

const store = useStore();
const emit = defineEmits(["selectedContinent", "search"]);

const lightMode = ref(store.state.lightMode);

const continents = reactive([
    { name: "Americas", value: "americas" },
    { name: "Europe", value: "europa" },
    { name: "Asia", value: "asia" },
    { name: "Africa", value: "africa" },
    { name: "Oceania", value: "oceania" },
    { name: "Antarctic", value: "antarctic" },
]);

const filterContinent = ref("All");

watchEffect(() => {
    emit("selectedContinent", filterContinent.value);
});

const search = ref<string>("");
watchEffect(() => {
    emit("search", search.value);
});

</script>

<style lang="scss" scoped>
@media screen and (min-width: 768px) {
    .medium {
        width: 300px;
    }
}

.input-section,
.select-section {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
</style>
