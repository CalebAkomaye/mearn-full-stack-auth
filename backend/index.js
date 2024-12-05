import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './db/connectDB.js'
import authRoutes from './routes/auth.routes.js'
import path from 'path'
config()
const app = express()
const PORT = process.env.PORT || 8000
const __dirname = path.resolve()
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)

if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "/frontend/dist")));

      app.get("*", (req, res) => {
            res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
      });
}


app.listen(PORT, () => {
      connectDB()
      console.log(`server running on Port http:/localhost:${PORT}`)
})
