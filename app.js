import express, { urlencoded } from 'express'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path';
const app = express()
const PORT = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: join(__dirname, 'public', 'views') })
})

app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`)
})
