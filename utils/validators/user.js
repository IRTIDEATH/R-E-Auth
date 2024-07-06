import { body } from "express-validator";
import perisma from "../../prisma/client/index.js";

export const validateUser = [
    body('name').notEmpty().withMessage('Name is Required'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email is invalid')
        .custom(async (value, {req}) => {
           if (!value) {
            throw new Error('Email is required')
           }

           const user = await perisma.user.findUnique({
            where:{
                email: value
            }
           })
           if(user && user.id !== Number(req.params.id)) {
            throw new Error('Email already exists')
           }
           return true
        }),
    body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long')
]