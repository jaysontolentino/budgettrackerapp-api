import http from 'http'
import express, { Express } from 'express'
import db from './utils/db.util'
import config from './config/app.config'
import log from './middlewares/logger.middleware'
import responseHeader from './middlewares/header.middleware'
import appRoutes from './routes/app.route'
import errorHandler from './middlewares/error.middleware'

const app: Express = express()
const { hostname, port } = config.server

// parse the request body into json
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// logger middleware
app.use(log.serverLogs)

// set response header
app.use(responseHeader)

// app routes
app.use(appRoutes)

// error handler
app.use(errorHandler)

// create server
const server = http.createServer(app)

const start = async () => {
    try {
        await db.connect()

        server.listen(port, () =>
            console.log(`Server start @ ${hostname}:${port} `)
        )
    } catch (error) {
        console.log('error: ', error)
    }
}

// start server
start()
