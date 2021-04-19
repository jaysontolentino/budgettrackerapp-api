import { Request, Response, NextFunction } from 'express'
import logger from '../utils/logger.util'

const serverLogs = (req: Request, res: Response, next: NextFunction) => {
    const NAMESPACE = 'Server'

    logger(
        NAMESPACE,
        'INFO',
        `[${req.method}] - URL: ${req.hostname + req.url} - IP: ${
            req.socket.remoteAddress
        }`
    )

    res.on('finish', () => {
        logger(
            NAMESPACE,
            'INFO',
            `[${req.method}] - URL: ${req.hostname} - IP: ${req.socket.remoteAddress} - STATUS:${res.statusCode}`
        )
    })

    next()
}

export default {
    serverLogs
}
