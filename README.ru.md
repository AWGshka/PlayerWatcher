# PlayerWatcher [RU]

**[EN версия](https://github.com/AWGshka/PlayerWatcher/blob/main/README.md)**

Получайте автоматические уведомления в Discord, когда игрок покидает или присоединяется к серверу Rust.
![предпросмотр](https://i.imgur.com/Iy9me9E.jpeg)

## Установка

Для инициализации зависимостей используйте `yarn`

Для запуска затем используйте `yarn start`

## Настройка конфигурации

### Discord Webhook

Вам понадобится URL-адрес веб-хука Discord. [Как получить URL веб-хука?](https://support.discord.com/hc/ru/articles/228383668-%D0%98%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-Webhooks)

Этот URL-адрес указывается в файле **.env** в кавычках.
`webhookUrl="DISCORD_WEBHOOK_URL_GOES_HERE"`

### ID сервера и игроков

Чтобы получить идентификатор сервера, вам нужно перейти на [Battlemetrics](https://www.battlemetrics.com/servers/rust) и найти там свой сервер.
После того, как вы найдете свой сервер, вы можете найти идентификатор сервера в URL-адресе

![serverUrl](https://i.imgur.com/2MMERur.png)

Этот идентификатор указывается в файле **.env** в значении `serverID=9255283`

Что касается игроков, все очень похоже. Перейдите по ссылке на сервер, которую вы получили для получения идентификатора сервера, и нажмите синюю кнопку **Players**. После этого найдите игроков, за которыми вы хотите наблюдать. Когда вы найдете игрока, снова обратите внимание на URL-адрес, в котором вы найдете идентификатор игрока

![playerUrl](https://i.imgur.com/IVVHXcX.png)

_П.С. Вы можете одновременно отслеживать до 60 игроков (из-за ограничения частоты запросов Battlemetrics)_
Чтобы настроить идентификаторы игроков, перейдите в файл **index.js** и просто сохраните свои идентификаторы, разделенные запятыми, в переменной **toFetch**.

```js
const toFetch = [1, 2, 3, 4, 5...];
```

### Дополнительная информация

Сообщение автоматически обновляется при любом изменении (один из игроков покидает или присоединяется). Последнее действие добавляется в нижний колонтитул со временной меткой, указывающей, когда оно произошло. Кроме того, отправляется сообщение **`@here`** , которое сразу удаляется, чтобы уведомить пользователей в сети об обновлении сообщения.

Есть вопросы/идеи? Вы можете оставить их [здесь](https://github.com/AWGshka/PlayerWatcher/issues).
