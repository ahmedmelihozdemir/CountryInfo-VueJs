<template>
    <div
        class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4"
    >
        <div
            class="card border-2 p-4 m-11 rounded-lg hover:cursor-pointer hover:shadow-lg hover:border-orange-800"
            v-for="(country, idx) in countries"
            :key="idx"
            @click="goToCountry(country.name.common)"
        >
            <div>
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

            <!-- <div>
                <span class="text-sm text-red-600">Currency: </span
                >{{ country.currencies }}
            </div> -->

            <!-- <div>
                <span class="text-sm text-red-600">Capital: </span>
                {{ country.capital }}
            </div> -->

            <!-- <div>
                <span class="text-sm text-red-600">Alt Spellings: </span
                >{{ country.altSpellings }}
            </div> -->

            <!-- <div>
                <span class="text-sm text-red-600">Languages: </span
                >{{ country.languages }}
            </div> -->

            <!-- <div>
                <span class="text-sm text-red-600"></span
                >{{ country.continent }}
            </div> -->

            <!-- <div>
                Arm
                <img :src="country.coatOfArms.png" alt="" />
            </div> -->
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

const goToCountry = (countryName: string) => {
    router.push({ name: "Country", params: { countryName } });
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
