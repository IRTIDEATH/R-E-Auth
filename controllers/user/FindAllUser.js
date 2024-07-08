import express from "express"
import perisma from "../../prisma/client/index.js"


// find user
export const findAllUser = async (req, res) => {
    try {
        // get all users from database
        const users = await perisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true
            },
            
            // hasil diurutkan berdasarkan id secara descending
            orderBy: {
                id: "desc",
            }
        })

        res.status(200).send({
            success: true,
            message: "Get all users successfully",
            data: users
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
}