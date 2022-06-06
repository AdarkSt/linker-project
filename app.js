const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 5000

async function start() {
    try{
        await mongoose.connect(config.get('mongoURi'), {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        app.listen(5000, () => {
            console.log(`app has been started on port ${PORT}`)
        })
    } catch (error) {
        console.log('Server Error', error.massage)
        process.exit(1)
    }
}

start()