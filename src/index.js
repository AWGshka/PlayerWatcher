import { fetchPlayers, updateStatuses } from "./utils.js";

process.env.serverID = 14876729;
const toFetch = [
  961752903, // INDIA
  1003651805, // jibbz
  1012403585, // Teen
  1147610213, // KIWi
  1156080350, // Warrior
  978249235, // Don Vito
];

console.clear();
console.log("[PlayerWatcher] Fetching players...");
await fetchPlayers(...toFetch);
await updateStatuses(true);
console.log("[PlayerWatcher] Players fetched. ");
console.log("[PlayerWatcher] Watching Players...");
setInterval(updateStatuses, 15 * 1000);
