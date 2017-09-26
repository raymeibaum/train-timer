const express = require('express')
const app = express()

const logger = require('morgan')

app.use(logger('dev'))
app.use(express.static('public'))

const port = process.env.PORT || 3000;
app.listen(port, () => { console.info(`Server listening on port: ${port}.`) })
