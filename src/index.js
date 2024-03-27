import { fetchPlayers, updateStatuses } from "./utils.js";

const toFetch = [
  961752903, // INDIA
  1003651805, // jibbz
  1012403585, // Teen
  1147610213, // KIWi
  1156080350, // Warrior
  978249235, // Don Vito
];
process.env.serverID = 14876729;
process.env.webhookUrl = "https://discord.com/api/webhooks/1222459794200461343/Az7usBXF8lSN_AqBz84JM3y0bsVhyDFPaHnctc5urPKBlAFE_aCI5KPBjb_k99cjjjWJ";

console.clear();
console.log("[PlayerWatcher] Fetching players...");
await fetchPlayers(...toFetch);
await updateStatuses(true);
console.log("[PlayerWatcher] Players fetched. ");
console.log("[PlayerWatcher] Watching Players...");
setInterval(updateStatuses, 15 * 1000);
