export const URL_PATCH_VERSION = "https://ddragon.leagueoflegends.com/api/versions.json";
export const URL_ALL_CHAMPIONS = (patch: string) => {
  return `https://ddragon.leagueoflegends.com/cdn/${patch}/data/fr_FR/champion.json`;
} 
export const URL_CHAMPION_DETAILS = (patch: string,champ: string) => {
  return `https://ddragon.leagueoflegends.com/cdn/${patch}/data/fr_FR/champion/${champ}.json`;
}
export const URL_CHAMPION_IMAGE = (patch: string,champ: string) => {
  return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${champ}.png`;
}
export const URL_ABILITY_IMAGE = (patch: string,ability: string) => {
  return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/spell/${ability}.png`;
}