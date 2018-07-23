require('dotenv').config();
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379
const NODE_ENV = process.env.NODE_ENV || 'development'

const knexFile = require('./knexfile')[NODE_ENV]
const knex = require('knex')(knexFile)

const redis = require('redis');
const redisClient = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT
})

const fs = require('fs');
const https = require('https')

const isLoggedIn = require('./utils/guard').isLoggedIn;

// Dependency Injection for Routers and Services
const ViewRouter = require('./ViewRouter');
// Need to add the routers for the service

const {
    CustomerRouter,
    SocketIORouter
} = require('./routers')

const {
    UserService
} = require('./services');

const {
    app,
    io
} = require('./utils/init-app')(knex);

let userService = new UserService(knex, redisClient);

new SocketIORouter(io, userService).router();
app.use('/', new ViewRouter(knex, io).router());

const httpsOptions = {
    key: fs.readFileSync('./localhost.key'),
    cert: fs.readFileSync('./localhost.crt')
}

https.createServer(httpsOptions, app).listen(8080, () => {
    console.log('Application started at port ' + 8080)
})