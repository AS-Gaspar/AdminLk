import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import path from 'path';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/{*any}', (req, res) => {
    if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'))
    } else {
        res.status(404).send('rota da api não foi encontrada')
    }
})

app.listen(PORT, () => {
    console.log(`Server rodando em http://localhost:${PORT}`)
})
