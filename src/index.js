import { fetchPlayers, updateStatuses } from "./utils.js";

const toFetch = [797691185, 1159754487, 961752903, 1003651805, 507365394];

console.clear();
console.log("[PlayerWatcher] Fetching players...");
await fetchPlayers(...toFetch);
await updateStatuses(true);
console.log("[PlayerWatcher] Players fetched. ");
console.log("[PlayerWatcher] Watching Players...");
setInterval(updateStatuses, 15 * 1000);
