'use-strict'

function jsonCallback(response) {
  console.log("handle results called", response)
}

function addStationsToDropdown(response) {
  const $stationSelect = $('#station-select')
  $stationSelect.empty()
  response.stations.forEach(station => $stationSelect.append(new Option(station, station)))
}

function getStationList() {
  $.get('/api/stations').then(addStationsToDropdown)
}

function displayResults(response) {
  const trainList = JSON.parse(response)
  const $body = $('body')
  console.log(trainList)
  trainList.forEach(train => $body.append(train.DIRECTION))
}

function submitForm(event) {
  event.preventDefault()
  const station = $(this).serializeArray()[0].value

  $.get(`/api/stations/${station}`).then(displayResults)
}

$(function () {
  getStationList()
  $('form').submit(submitForm)
})
