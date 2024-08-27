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

const fetchChamps = async (): Promise<Record<string, ChampData>> => {
  return fetchData(
    "https://ddragon.leagueoflegends.com/cdn/14.16.1/data/fr_FR/champion.json"
  );
};

const fetchChampDetails = async (
  champ: string
): Promise<{
  champImage: string;
  champAbilities: Ability[];
  champAbilitiesImages: string[];
}> => {
  try {
    const champImage = `https://ddragon.leagueoflegends.com/cdn/14.16.1/img/champion/${champ}.png`;

    const abilitiesResponse = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/14.16.1/data/fr_FR/champion/${champ}.json`
    );
    const champAbilitiesData = await abilitiesResponse.json();
    const champAbilities = champAbilitiesData.data[champ].spells;

    const champAbilitiesImages = champAbilities.map(
      (ability: Ability) =>
        `https://ddragon.leagueoflegends.com/cdn/14.16.1/img/spell/${ability.id}.png`
    );

    return {
      champImage,
      champAbilities,
      champAbilitiesImages,
    };
  } catch (error) {
    console.error(`Error fetching details for ${champ}:`, error);
    return {
      champImage: "",
      champAbilities: [],
      champAbilitiesImages: [],
    };
  }
};

export const loadChampData = async (setChampData: (data: any) => void) => {
  const champs = await fetchChamps();

  const champDataPromises = Object.keys(champs.data).map(async (champ) => {
    const details = await fetchChampDetails(champ);
    return {
      [champ]: {
        image: details.champImage,
        abilities: details.champAbilities,
        abilitiesImages: details.champAbilitiesImages,
      },
    };
  });

  
  const champsDetails = await Promise.all(champDataPromises);
  
  const mergedData = champsDetails.reduce((acc, curr) => {
    return { ...acc, ...curr };
  }, {} as Record<string, { image: string; abilities: Ability[]; abilitiesImages: string[] }>);

  setChampData({
    champs,
    champsImages: Object.fromEntries(
      Object.entries(mergedData).map(([champ, data]) => [champ, data.image])
    ),
    champsAbilities: Object.fromEntries(
      Object.entries(mergedData).map(([champ, data]) => [
        champ,
        data.abilities,
      ])
    ),
    champsAbilitiesImages: Object.fromEntries(
      Object.entries(mergedData).map(([champ, data]) => [
        champ,
        data.abilitiesImages,
      ])
    ),
  });
};