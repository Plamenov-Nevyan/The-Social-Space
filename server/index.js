const app = require('express')()
const port = 8000
const http = require('http').Server(app)
const cors = require('cors')

app.use(cors())

app.get('/', (req, res) => {
    res.json({
        message : "Hello world"
    })
})

http.listen(port, () => {
    console.log(`Surver running on port ${port}...`)
})