import { Router, Request, Response, NextFunction } from 'express'
import v1Routes from './v1'
import setError from './../utils/error.util'

const router: Router = Router()

//v1 routes here
router.use('/api/v1', v1Routes)

//v2 routes goes here
//router.use('/api/v2', ...)

router.use('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`404 Not Found - URL: ${req.baseUrl}`)
    next(setError(err, 404))
})

export default router
