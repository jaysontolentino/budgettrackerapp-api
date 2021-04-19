import { QueryFailedError } from 'typeorm'

export default (error: Error, statusCode: number) => {
    let httpCode: number = statusCode

    if (error instanceof QueryFailedError) {
        httpCode = 422
    }

    return {
        message: error.message,
        statusCode: httpCode
    }
}
