<template>
    <div class="home">
        <HeaderComponent></HeaderComponent>
        <FilterComponent></FilterComponent>
        <CountryList></CountryList>
    </div>
</template>

<script lang="ts" setup>
import HeaderComponent from "@/components/layout/HeaderComponent.vue";
import FilterComponent from "@/components/shared/FilterComponent.vue";
import CountryList from "@/components/shared/CountryList.vue";
</script>

<style scoped lang="scss"></style>
