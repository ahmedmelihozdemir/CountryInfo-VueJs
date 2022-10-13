<template>
    <div
        class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4"
    >
        <div>filter continent:{{ filterContinent }}</div>
        <div
            class="card p-4 m-11 rounded-lg hover:shadow-lg hover:border-orange-800"
            v-for="(country, idx) in countries.sort((a, b) =>
                a.name.common.localeCompare(b.name.common)
            )"
            :key="idx"
        >
            <div class="flex flex-col justify-center items-center ">
                <div class="flex justify-center">
                    <img :src="country.flags.png" alt="" class="rounded-xl" />
                </div>
                <br />
                <br />
                <div>
                    <span class="text-sm text-red-600">Name: </span
                    >{{ country.name.common }}
                </div>
                <div>
                    <span class="text-sm text-red-600">Region: </span>
                    {{ country.region }}
                </div>
                <div>
                    <span class="text-sm text-red-600">Subregion: </span>
                    {{ country.subregion }}
                </div>
                <div>
                    <span class="text-sm text-red-600">Population: </span>
                    {{
                        country.population
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }}
                </div>
            </div>
            <div
                class="flex justify-end mt-4 hover:cursor-pointer"
                @click="goToCountry(country.name.common)"
            >
                <span
                    class="text-sm text-red-600 bg-purple-600 hover:text-purple-200 hover:bg-red-600 rounded-lg p-2"
                    >More Info</span
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import { CountriesService } from "@/services/Countries.service";
import { ICountry } from "@/models/Country.interface";
import { useRouter } from "vue-router";

const router = useRouter();

const filterContinent = inject("filterContinent");

const countryInfoService = new CountriesService();
const countries = ref([] as ICountry[]);
const filterContinentCountries = ref<ICountry[]>([]);

const goToCountry = (countryName: string) => {
    router.push("/country/" + countryName);
};

const getCountriesInfo = () => {
    countryInfoService.getCountry().then((response) => {
        countries.value = response;
        filterContinentCountries.value = countries.value.filter(
            (country) => country.region === filterContinent
        );
        if (filterContinent == "All") {
            return countries.value;
        }
    });
};

onMounted(() => {
    getCountriesInfo();
});
</script>

<style scoped lang="scss">
.card {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    transition: all 0.6s ease-in-out 0s;
    &:hover {
        transform: scale(1.1);
    }
}
</style>
