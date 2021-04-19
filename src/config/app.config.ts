import dotenv from 'dotenv'
import path from 'path'

const env = process.env.NODE_ENV || 'development'

const envFile = env !== 'production' ? `.env.${env}` : '.env'

dotenv.config({
    path: path.resolve(__dirname, `./../../${envFile}`)
})

const server = {
    hostname: process.env.SERVER_HOSTNAME || 'localhost',
    port: process.env.SERVER_PORT || 3000
}

export default {
    server
}
