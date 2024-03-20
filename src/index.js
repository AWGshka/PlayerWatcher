import { fetchPlayers, updateStatuses } from "./utils.js";

const toFetch = [797691185, 1159754487, 961752903, 1165808661, 350283018, 487824426, 1161882879];

console.clear();
console.log("[PlayerWatcher] Fetching players...");
await fetchPlayers(...toFetch);
await updateStatuses(true);
console.log("[PlayerWatcher] Players fetched. ");
console.log("[PlayerWatcher] Watching Players...");
setInterval(updateStatuses, 15 * 1000);
