const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const i18next = require('i18next')
const i18nextBackend = require('i18next-fs-backend')
const i18nextMiddleware = require('i18next-http-middleware')
const { userAgentMiddleware, scanXSS } = require('./lib/middlewares')

const app = express()

app.use(cors());
app.use(bodyParser.json());
app.use(userAgentMiddleware)
app.use(scanXSS)
i18next.use(i18nextBackend).use(i18nextMiddleware.LanguageDetector).init({
    fallbackLng: 'en',
    backend: {
        loadPath: './locales/{{lng}}/translation.json'
    }
})
app.use(i18nextMiddleware.handle(i18next))
app.use(require('./api'));

const server = http.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = server;