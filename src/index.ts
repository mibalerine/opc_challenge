import express from 'express';
import topWordsController from './controllers/hackernews/topwords';
const app = express()
const port = 3000

app.get('/api/hackernews/storiesoftheday/top10words', topWordsController)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})