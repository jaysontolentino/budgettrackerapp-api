import 'reflect-metadata'
import { createConnection } from 'typeorm'
import logger from './logger.util'

const NAMESPACE = 'Database'

const connect = async (): Promise<void> => {
    try {
        await createConnection()

        logger(NAMESPACE, 'INFO', `Successfully connected to database`)
    } catch (error) {
        throw error
    }
}

export default {
    connect
}
