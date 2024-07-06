import express from 'express'
import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    // Get Token
    const token = req.headers['authorization']

    // jika tidak ada token
    if(!token) return res.status(401).json({message: 'Unauthenticated.'})

    // verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        // kalau error token tidak valid
        if(err) return res.status(401).json({ message: 'Invalid token' })
        req.userId = decoded.id
        next()
    })
}