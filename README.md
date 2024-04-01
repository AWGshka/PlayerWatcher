# PlayerWatcher [EN]

**[RU version](https://github.com/AWGshka/PlayerWatcher/blob/main/README.ru.md)**

Get notified to discord automatically when player leaves/joins Rust server.
![preview](https://i.imgur.com/Iy9me9E.jpeg)

## Installation

To initilize dependencies use `yarn`

To start use then `yarn start`

## Setting up config

### Discord Webhook

You'll need a discord webhook url. [How to get webhook url?](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)

This url goes to **.env** file within `""` brackets.
`webhookUrl="DISCORD_WEBHOOK_URL_GOES_HERE"`

### Server & Player IDs

To get server id you'll need to head over to [Battlemetrics](https://www.battlemetrics.com/servers/rust), and find your server there.
Once you located your server, you can find server id in your urls

![serverUrl](https://i.imgur.com/2MMERur.png)

This id goes to **.env** file to serverID value `serverID=9255283`

What regards players, its very familliar. Head over to server link you visited to get server id, and click on blue button **Players**. After that find players that you need to watch. After you found player, again, take a note of url, you'll find that player id in your url

![playerUrl](https://i.imgur.com/IVVHXcX.png)

_P.S. You can watch simultaneously up to 60 players (due to rate limit of Battlemetrics)_
To set up player ids head over to **index.js** file and simply store your ids comma-separated in **toFetch** variable.

```js
const toFetch = [1, 2, 3, 4, 5...];
```

## Extra Information

The message is automatically updated whenever there is a change (one of the players leaves or joins). The last action is added to the footer with a timestamp indicating when it occurred. Additionally, an **`@here`** message is sent and immediately deleted to notify online users that the message has been updated.

Any issues/ideas? You are welcomed [here](https://github.com/AWGshka/PlayerWatcher/issues).
