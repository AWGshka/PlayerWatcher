import { EmbedBuilder, WebhookClient } from "discord.js";

const fetchedPlayers = [];

setTimeout(() => {
  fetchedPlayers[0].status = !fetchedPlayers[0].status;
}, 10000);

const fetchPlayers = async (...playerIDs) => {
  const promises = playerIDs.map(async (playerID) => {
    const apiPlayerUrl = `https://api.battlemetrics.com/players/${playerID}?filter[servers]=${process.env.serverID}&include=server&fields[player]=name&fields[server]=name`;
    const player = await fetch(apiPlayerUrl).then((res) => res.json());
    fetchedPlayers.push({
      id: player.data.id,
      name: player.data.attributes.name,
      status: player.included[0].meta.online,
    });
  });
  await Promise.all(promises);
};

const updateStatuses = async (force = false) => {
  const apiServerUrl = `https://api.battlemetrics.com/servers/${process.env.serverID}?include=player&fields[player]=name`;
  const server = await fetch(apiServerUrl).then((res) => res.json());
  const serverName = server.data.attributes.name;
  const allPlayers = server.included;

  let lastUpdate;
  let shouldSendWebhook = force;
  fetchedPlayers.forEach((player) => {
    const isOnServer = allPlayers.some((p) => p.id === player.id);
    if (player.status !== isOnServer) {
      shouldSendWebhook = true;
      player.status = isOnServer;
      lastUpdate = `${player.name} ${isOnServer ? "joined" : "left"} the server`;
    }
  });

  if (shouldSendWebhook) {
    const formattedPlayers = fetchedPlayers
      .map((player) => `${player.status ? "🟢" : "🔴"} | **${player.name}** ([${player.id}](https://www.battlemetrics.com/players/${player.id}))`)
      .join("\n");
    sendWebhook(serverName, formattedPlayers, lastUpdate);
    console.log("[PlayerWatcher] Sent players update.");
  }
};

let messageId;

const sendWebhook = async (title, message, lastUpdate) => {
  const avatar = "https://i.imgur.com/YhmstPJ.png";
  const webhookClient = new WebhookClient({
    url: "https://discord.com/api/webhooks/1222459794200461343/Az7usBXF8lSN_AqBz84JM3y0bsVhyDFPaHnctc5urPKBlAFE_aCI5KPBjb_k99cjjjWJ",
  });

  const embed = new EmbedBuilder().setTitle(title).setColor(0xffffff).setDescription(message).setTimestamp(Date.now());
  if (lastUpdate) embed.setFooter({ text: lastUpdate, iconURL: avatar });

  const content = { content: null, username: "Player Watcher", avatarURL: avatar, embeds: [embed] };

  if (messageId) {
    await webhookClient.editMessage(messageId, content).catch(() => (messageId = null));
    await webhookClient.send("@here").then((message) => webhookClient.deleteMessage(message.id));
  }

  if (!messageId) await webhookClient.send(content).then((message) => (messageId = message.id));
};

export { fetchPlayers, updateStatuses, sendWebhook };
