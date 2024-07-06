import { body } from "express-validator";
import perisma from "../../prisma/client/index.js";

// Definisikan validasi untuk register
export const validateRegister = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email is invalid')
        .custom(async (value) => {
            if(!value) {
                throw new Error('Email is required')
            }

            const user = await perisma.user.findUnique({
                where: {
                    email: value
                }
            })

            // memeriksa email apakah email yang diisi oleh user sudah digunakan atau belum
            if (user) {
                throw new Error('Email already exists')
            }
            return true
        }),
    body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long'),
];

// definisikan validasi untuk login
export const validateLogin = [
    body('email').notEmpty().withMessage('Email is required'),
    body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long'),
]