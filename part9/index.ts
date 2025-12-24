import express from 'express'
const app = express()

app.get('/hello', (_req, res) => {
    res.send('hello world')
})

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})