<template>
    <div class="home">
        <HeaderComponent />
        <FilterComponent
            @selectedContinent="sentContinent"
            @search="searching"
        />
        <CountryList
            :selectedContinent="sentFilteredContinent"
            :searchList="searched"
        />
    </div>
</template>

<script lang="ts" setup>
import HeaderComponent from "@/components/layout/HeaderComponent.vue";
import FilterComponent from "@/components/shared/FilterComponent.vue";
import CountryList from "@/components/shared/CountryList.vue";
import { ref } from "vue";

const sentFilteredContinent = ref("All");

const sentContinent = (continent: string) => {
    sentFilteredContinent.value = continent;
};

const searched = ref<string>("");
const searching = (search: string) => {
    searched.value = search;
};
</script>

<style scoped lang="scss"></style>
