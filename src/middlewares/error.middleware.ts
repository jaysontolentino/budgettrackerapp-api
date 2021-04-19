import { Request, Response, NextFunction } from 'express'

interface Err {
    message: string
    statusCode: number
}

export default (err: Err, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: err.message
    })
}
