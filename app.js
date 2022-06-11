const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()


app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

if(proccess.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

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
        console.log('Server Error', error)
        process.exit(1)
    }
}

start()