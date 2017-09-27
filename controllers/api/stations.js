const express = require('express')
const router = express.Router()
const request = require('request')

const stations = require('../../data/stations')


router.get('/', (req, res) => {
  res.json(stations)
})

router.get('/:station', (req, res) => {
  const station = req.params.station
  request(`http://developer.itsmarta.com/NextTrainService/RestServiceNextTrain.svc/GetNextTrain/${station}`, (error, response, body) => {
    if (error) {
      console.log('error:', error)
      console.log('statusCode:', response && response.statusCode)
    }
    res.send(body)
  })
})

module.exports = router
