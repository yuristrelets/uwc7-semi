# uwc7-semi

> author Yuri Strelets<br/>
> email `yuristrelets@gmail.com`<br/>
> skype `yuristrelets`

Reddit Reader для uawebchallenge.
Решение использует Service Worker и работает в Chrome 42 (по крайней мере, тестировалось именно в нем).
В правом верхнем углу есть значек глаза, который показывает работает ли Service Worker в данный момент.
Service Worker активируется только после второй перезагрузки страницы.
Все обновления страницы с отключением кеша также отключают и Service Worker.


## Установка
```
npm i
```


## Запуск
Тестировалось на локальном веб-сервере в WebStorm (например, `http://localhost:63342/uwc7-semi/index.html`).
Если запускать из папки отличной от `/uwc7-semi/`,
необходимо в файле `./src/values.js` исправить значение `serviceWorker.scope`.
Можно запустить https://yuristrelets.github.io/uwc7-semi,
но из-за политик безопасности воркер работает некорректно
(к сожалению, обнаружил слишком поздно, уже не было времени что-то менять).


## Зависимости

 * angular 1.3.15
 * browserify сборка
 * [reddit.js](https://github.com/sahilm/reddit.js) (не очень удачный выбор)