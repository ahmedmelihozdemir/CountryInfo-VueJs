import { ICountry } from "@/models/Country.interface";
import { HttpClient, HttpRequestParamsInterface,} from "@/models/http-client/index";

export class CountriesService {
    getCountry() {
        const countryRequest: HttpRequestParamsInterface = {
            url: `https://restcountries.com/v3.1/all`,
        };
        return HttpClient.get<ICountry[]>(countryRequest);
    }
}
