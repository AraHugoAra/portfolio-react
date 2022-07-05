const express = require('express')
const cors = require('cors')
const axios = require('axios')

require('dotenv').config()

const app = express()
app.use(cors())

const path = require('path')

const port = process.env.PORT || 5000

if (process.env.NODE_ENV === "production") {
    app.use(express.static('build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
}

app.get('/videos', (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://portfolio-trebor-strapi.herokuapp.com/api/videos?populate=video,poster',
        headers: {Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN_SALT_HEROKU}`}
    }
    axios.request(options).then((response) => {
        res.json(response.data)
    })
}
)

app.get('/store', (req, res) => {
const options = {
    method: 'GET',
    url: 'https://portfolio-trebor-strapi.herokuapp.com/api/shop-items?populate=image,category',
    headers: {Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN_SALT_HEROKU}`}
}
axios.request(options).then((response) => {
    res.json(response.data)
})
}
)

app.listen(port, (err) => {
    if (err) return console.log(err)
    console.log('Server running on port: ', port)
})