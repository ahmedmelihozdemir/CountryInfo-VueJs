<template>
    <div
        class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-12"
    >
        <div
            class="card p-4 m-10 rounded-lg hover:shadow-lg hover:border-orange-800 relative h-full"
            v-for="country in filterContinets.sort((a, b) =>
                a.name.common.localeCompare(b.name.common)
            )"
            :key="country.name.common"
        >
            <div class="flex flex-col justify-center items-center">
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
                class="flex justify-end mt-4 hover:cursor-pointer absolute bottom-0 right-0"
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
import { ref, onMounted,  defineProps, watch } from "vue";
import { CountriesService } from "@/services/Countries.service";
import { ICountry } from "@/models/Country.interface";
import { useRouter } from "vue-router";

const router = useRouter();

const countryInfoService = new CountriesService();
const countries = ref([] as ICountry[]);
const filterContinets = ref<ICountry[]>([]);

const goToCountry = (countryName: string) => {
    router.push("/country/" + countryName);
};

const props = defineProps({
    selectedContinent: String,
    searchList: String,
});

const getCountriesInfo = () => {
    countryInfoService.getCountry().then((response) => {
        countries.value = response;
        filterContinets.value = response;
    });
};

watch(
    () => props.selectedContinent,
    (newVal) => {
        if (newVal === "All" || newVal === undefined || newVal === null) {
            filterContinets.value = countries.value;
        } else {
            filterContinets.value = countries.value.filter(
                (country) => country.region === newVal
            );
        }
    }
);

watch(
    () => props.searchList,
    (newVal) => {
        if (newVal === "" || newVal === undefined || newVal === null) {
            filterContinets.value = countries.value;
        } else {
            filterContinets.value = countries.value.filter((country) =>
                country.name.common.toLowerCase().includes(newVal.toLowerCase())
            );
        }
    }
);

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
