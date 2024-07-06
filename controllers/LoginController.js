import express from "express"
import { validationResult } from "express-validator"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import perisma from "../prisma/client/index.js"

export const loginController = async (req, res) => {
    // periksa hasil validasi
    // (parameternya adalah request dari si pengguna)
    const errors = validationResult(req)


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


    // jika request yang dikirim sudah sesuai, maka kita akan lanjutkan mencari data user berdasarkan email
    try {
        // find user
        const user = await perisma.user.findFirst({
            where: {
                email: req.body.email
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true
            }
        })

        // jika user gk ketemu
        if(!user)
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        
        // jika sudah ketemu, kita compare passwordnya
        const validPassword = await bcryptjs.compare(
            req.body.password,
            user.password
        )

        // password incorrect
        if(!validPassword)
            return res.status.json({
                success: false,
                message: "Invalid password"
            })

        // generate token JWT jika password nya benar
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
            expiresIn: "1h",
        })

        // lakukan Destruct password agar tidak ditampilkan pada response JSON
        const {password, ...userWithOutPassword} = user


        // return response dan kasih tokennya jika berhasil
        res.status(200).send({
            success: true,
            message: "Login successfully",
            data: {
                user: userWithOutPassword,
                token: token
            }
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}