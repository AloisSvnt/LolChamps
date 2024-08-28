import { Ability } from '../types/interfaces';
import { fetchChamps, fetchChampDetails } from './api';

export const loadChampData = async (setChampData: (data: any) => void) => {
  const champs = await fetchChamps();

  const champDataPromises = Object.keys(champs.data).map(async (champ) => {
    const details = await fetchChampDetails(champ);
    return {
      [champ]: {
        image: details.urlChampImage,
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