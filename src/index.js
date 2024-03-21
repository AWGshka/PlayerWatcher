import { fetchPlayers, updateStatuses } from "./utils.js";

const toFetch = [961752903, 1003651805, 507365394, 870301508, 818711896, 930568674, 1012403585, 900253841];

console.clear();
console.log("[PlayerWatcher] Fetching players...");
await fetchPlayers(...toFetch);
await updateStatuses(true);
console.log("[PlayerWatcher] Players fetched. ");
console.log("[PlayerWatcher] Watching Players...");
setInterval(updateStatuses, 15 * 1000);
