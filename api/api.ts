import express, { json, urlencoded } from 'express'
import { RegisterRoutes } from '../config/routes'

export const api = express()

// Use body parser to read sent json payloads
api.use(
    urlencoded({
        extended: true,
    })
)
api.use(json())

RegisterRoutes(api)

export default api
