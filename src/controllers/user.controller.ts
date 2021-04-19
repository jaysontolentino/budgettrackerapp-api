import { Request, Response, NextFunction } from 'express'
import { validate } from 'class-validator'
import { User } from './../entity/User'
import setError from './../utils/error.util'

//READ USERS
//CREATE USER
//UPDATE USER
//DELETE USER
//FIND USER

// get all users
const getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        next(setError(error, 500))
    }
}

// create user
const postUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const { email, firstName, lastName, age, address } = req.body

    try {
        const user = new User({
            email,
            firstName,
            lastName,
            age,
            address
        })

        let errors = await validate(user)

        if (errors.length > 0) {
            const errorArr = Object.values(errors[0].constraints)
            const err = new Error(errorArr[0])
            return next(setError(err, 400))
        }

        await user.save()

        res.status(201).json(user)
    } catch (error) {
        next(setError(error, 500))
    }
}

// get user by id
const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {
        const user = await User.findOne(id)

        if (!user) {
            const err = new Error(`${id} not found`)
            return next(setError(err, 404))
        }

        res.status(200).json(user)
    } catch (error) {
        next(setError(error, 500))
    }
}

// update user by id
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {
        const user = await User.findOne(id)

        if (!user) {
            const err = new Error(`${id} not found`)
            return next(setError(err, 404))
        }

        User.merge(user, req.body)
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        next(setError(error.message, 500))
    }
}

// delete user by id
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {
        const user = await User.findOne(id)

        if (!user) {
            const err = new Error(`${id} not found`)
            return next(setError(err, 404))
        }

        await user.remove()

        res.status(410).json(user)
    } catch (error) {
        next(setError(error.message, 500))
    }
}

export default { getUsers, postUser, getUser, updateUser, deleteUser }
