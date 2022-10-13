<template>
    <div
        class="flex flex-col justify-center items-center"
    >
        <div class="flex justify-center items-center m-4">
            <h1>
                Information for
                <span class="text-red-500">{{ countryName }} </span>
            </h1>
        </div>
        <div
            class="card flex flex-col justify-center items-center rounded-lg hover:cursor-pointer hover:shadow-lg hover:border-orange-800 mt-4"
            v-for="(country, idx) in filterCountries"
            :key="idx"
        >
            <div class="flex justify-center items-center pt-4">
                <img :src="country.flags.png" alt="" class="rounded-xl w-64" />
            </div>
            <br />
            <div>
                <span class="text-sm text-red-600">Name: </span
                >{{ country.name.common }}
            </div>
            <br />
            <div>
                <span class="text-sm text-red-600">Region: </span>
                {{ country.region }}
            </div>
            <br />
            <div>
                <span class="text-sm text-red-600">Subregion: </span>
                {{ country.subregion }}
            </div>
            <br />
            <div>
                <span class="text-sm text-red-600">Population: </span>
                {{
                    country.population
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}
            </div>
            <br />
            <div>
                <span class="text-sm text-red-600">Currency: </span
                >{{ country.currencies }}
            </div>
            <br />
            <div>
                <span class="text-sm text-red-600">Capital: </span>
                {{ country.capital }}
            </div>
            <br />
            <div>
                <span class="text-sm text-red-600">Alt Spellings: </span
                >{{ country.altSpellings }}
            </div>
            <br />
            <div>
                <span class="text-sm text-red-600">Languages: </span
                >{{ country.languages }}
            </div>
            <br />
            <div>
                <span class="text-sm text-red-600"></span
                >{{ country.continent }}
            </div>
            <br />
            <div class="flex flex-col justify-center items-center">
                <span class="flex justify-center items-center text-sm text-red-600">Arm</span>
                <img :src="country.coatOfArms.png" alt="" class="w-36 h-36" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { CountriesService } from "@/services/Countries.service";
import { ICountry } from "@/models/Country.interface";
import { useRoute, } from "vue-router";

const route = useRoute();

const countryName = ref(route.params.country);
const filterCountries = ref<ICountry[]>([]);

const countryInfoService = new CountriesService();
const countries = ref([] as ICountry[]);

const getCountriesInfo = () => {
    countryInfoService.getCountry().then((response) => {
        countries.value = response;
        filterCountries.value = countries.value.filter(
            (country) => country.name.common === countryName.value
        );
    });
};

onMounted(() => {
    getCountriesInfo();
});
</script>

<style scoped lang="scss">
.card {
    width: 50%;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    transition: all 0.6s ease-in-out 0s;
    &:hover {
        transform: scale(1);
    }
}
</style>
