import express from "express"
import { validationResult } from "express-validator"
import bcryptjs from "bcryptjs"
import perisma from "../prisma/client/index.js"

// func Register
export const registerController = async (req, res) => {
    const errors = validationResult(req)

    // periksa hasil validasi
    // (parameternya adalah request dari si pengguna)
    if (!errors.isEmpty()) {
        // jika ada error, kembalikan error ke pengguna
        /**
         * (jika variable errors di atas tidak kosong (ada), artinya ada validasi yang
         * belum terpenuhi, maka kita akan return ke dalam format JSON
         * dan berisi informasi validasi yang dibutuhkan)
         */
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array()
        })
    }

    // hash password nya
    // jika req sudah sesuai dengan validasi, kita hash dlu passwordnya
    const hashedPassword = await bcryptjs.hash(req.body.password, 10)
    
    // setelah itu kita lakukan insert data ke dalam database
    try {
        // insert data
        const user = await perisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            }
        })

        // return response json
        res.status(201).send({
            success: true,
            message: "Register successfuly",
            data: user
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}