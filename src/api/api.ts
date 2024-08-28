import { URL_PATCH_VERSION, URL_ALL_CHAMPIONS, URL_CHAMPION_DETAILS, URL_CHAMPION_IMAGE, URL_ABILITY_IMAGE } from "../config/URL_API";
import { Ability, ChampData } from "../types/interfaces";

export const fetchData = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data from ${url}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error: ${error}`);
    return {} as T;
  }
};

const patch = await fetchData(URL_PATCH_VERSION).then((data) => (data as string)[0]);
const urlChampions = URL_ALL_CHAMPIONS(patch);

export const fetchChamps = async (): Promise<Record<string, ChampData>> => {
  return fetchData(urlChampions);
};

export const fetchChampDetails = async (
  champ: string
): Promise<{
  urlChampImage: string;
  champAbilities: Ability[];
  champAbilitiesImages: string[];
}> => {
  try {
    const urlChampImage = URL_CHAMPION_IMAGE(patch,champ);
    const urlChampDetail = URL_CHAMPION_DETAILS(patch,champ);
    
    const abilitiesResponse = await fetch(urlChampDetail);
    const champAbilitiesData = await abilitiesResponse.json();
    const champAbilities = champAbilitiesData.data[champ].spells;
    
    const champAbilitiesImages = champAbilities.map(
      (ability: Ability) =>{
        return URL_ABILITY_IMAGE(patch,ability.id);
      }
    );

    return {
      urlChampImage,
      champAbilities,
      champAbilitiesImages,
    };
  } catch (error) {
    console.error(`Error fetching details for ${champ}:`, error);
    return {
      urlChampImage: "",
      champAbilities: [],
      champAbilitiesImages: [],
    };
  }
};