<template>
    <div
        class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4"
    >
        <div
            class="card  p-4 m-11 rounded-lg hover:cursor-pointer hover:shadow-lg hover:border-orange-800"
            v-for="(country, idx) in countries"
            :key="idx"
            @click="goToCountry(country.name.common)"
        >
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
            <div class="flex justify-end mt-5">
                <span class="text-sm text-red-600 bg-purple-600 p-2 hover:text-purple-200 hover:bg-red-600 rounded-lg">More Info</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { CountriesService } from "@/services/Countries.service";
import { ICountry } from "@/models/Country.interface";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const route = useRoute();
const router = useRouter();

const countryInfoService = new CountriesService();
const countries = ref([] as ICountry[]);

const getCountriesInfo = () => {
    countryInfoService.getCountry().then((response) => {
        countries.value = response;
    });
};

const goToCountry = (countryName) => {
    router.push("/country/" + countryName);
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
