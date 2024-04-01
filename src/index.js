import { checkConfig, fetchPlayers, updateStatuses } from "./utils.js";

const toFetch = [];

console.clear();
checkConfig();
console.log("[PlayerWatcher] Fetching players...");
await fetchPlayers(...toFetch);
await updateStatuses(true);
console.log("[PlayerWatcher] Players fetched. ");
console.log("[PlayerWatcher] Watching Players...");
setInterval(updateStatuses, 15 * 1000);
