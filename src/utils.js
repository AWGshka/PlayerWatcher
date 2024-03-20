const serverID = 14876729;
const fetchedPlayers = [];

const fetchPlayers = async (...playerIDs) => {
  const promises = playerIDs.map(async (playerID) => {
    const apiPlayerUrl = `https://api.battlemetrics.com/players/${playerID}?filter[servers]=${serverID}&include=server&fields[player]=name&fields[server]=name`;
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
  const apiServerUrl = `https://api.battlemetrics.com/servers/${serverID}?include=player&fields[player]=name`;
  const server = await fetch(apiServerUrl).then((res) => res.json());
  const serverName = server.data.attributes.name;
  const allPlayers = server.included;
  let shouldSendWebhook = force;

  fetchedPlayers.forEach((player) => {
    const isOnServer = allPlayers.some((p) => p.id === player.id);
    if (player.status !== isOnServer) {
      player.status = isOnServer;
      shouldSendWebhook = true;
    }
  });

  if (shouldSendWebhook) {
    const formattedPlayers = fetchedPlayers
      .map((player) => `${player.status ? "🟢" : "🔴"} | **${player.name}** ([${player.id}](https://www.battlemetrics.com/players/${player.id}))`)
      .join("\n");
    sendWebhook(serverName, formattedPlayers);
    console.log("[PlayerWatcher] Sent players update.");
  }
};

const sendWebhook = (title, message) => {
  const webHookUrl = "https://discord.com/api/webhooks/1219929165579423754/7ejZklWlvTi27pLj9pxnXXAHHGJ8JiJDgYzwIw6Txap9NcT5yzACur0glY7IPuDiX43t";
  fetch(webHookUrl, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      content: null,
      embeds: [
        {
          title: title,
          description: message,
          color: 16777201,
          timestamp: new Date(),
        },
      ],
      attachments: [],
    }),
  }).catch((err) => console.log(err));
};

export { fetchPlayers, updateStatuses, sendWebhook };
